const functions = require('firebase-functions')
const admin = require('firebase-admin')
const base64 = require('base-64')
const Cloudflare = require('cloudflare')
const { S3Client } = require('@aws-sdk/client-s3')

const errorConsole = () => {
  // Should be logged somewhere
}

// Secrets
const {
  pabbly: {
    username: PABBLY_USERNAME,
    password: PABBLY_PASSWORD,
    silver: PABBLY_SILVER,
    gold: PABBLY_GOLD,
  } = {},
  aws: { id: AWS_ACCESS_ID, key: AWS_ACCESS_KEY },
  cf: { id: CF_ID, token: CF_TOKEN },
} = functions.config()
const AWS_REGION = 'ap-south-1'
const PABBLY_AUTH_HEAD = `Basic ${base64.encode(
  `${PABBLY_USERNAME}:${PABBLY_PASSWORD}`
)}`

// INIT SDKs
admin.initializeApp()
const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_ACCESS_KEY,
  },
  region: AWS_REGION,
})
const cf = Cloudflare({ token: CF_TOKEN })

// Include Helpers
const { UUID, toDatabaseRef } = require('./helpers')
const {
  PABBLY_API_CREATE_CUSTOMER,
  PABBLY_API_GET_CUSTOMER_PLANS,
  PABBLY_API_UPDATE_CUSTOMER,
  PABBLY_API_VERIFYHOSTED,
} = require('./helpers/apis')({
  auth: PABBLY_AUTH_HEAD,
})
const {
  cleanRequest,
  validateFirebaseIdToken,
} = require('./helpers/middleware')(admin)
const {
  syncUser,
  syncCustomer,
  setWebTimestamp,
  storageFiles,
} = require('./helpers/firebase')(admin)
const {
  createHostedBucket,
  putHostedBucket,
  deleteHostedBucket,
} = require('./helpers/aws')(s3)
const {
  setDomain,
  checkDomain,
  dnsDomain,
  deleteDomain,
  deleteDomainName,
} = require('./helpers/cloudflare')(cf, CF_ID)

/*
 * EVENT: User Registeration
 * Sync with Pabbly
 */
// exports.userRegister = functions.auth
//   .user()
//   .onCreate(async ({ uid, customClaims, displayName, email }) => {
//     const {
//       data: { id: customer_id },
//     } = await PABBLY_API_CREATE_CUSTOMER(displayName, email)
//     try {
//       await syncUser(
//         uid,
//         Object.assign({}, customClaims || {}, { customer_id })
//       )
//     } catch (e) {
//       errorConsole(e)
//     }
//     return
//   })

// TODO: Pabbly webhook Events
exports.pabblyEvent = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    // TODO: Add Basic Authentication (same username/password as pabbly)
    try {
      const {
        event_type: eventType,
        // event_source: eventSource,
        data: {
          customer_id: customerId,
          plan_id: planId,
          product_id: productId,
        } = {},
      } = request.body || {}
      switch (eventType) {
        case 'customer_create':
          break
        case 'customer_delete':
          break
        case 'subscription_activate':
          break
        case 'subscription_create':
          break
        case 'subscription_upgrade':
          break
        case 'subscription_cancel':
          break
        case 'payment_success':
          if (!customerId && !planId && !productId) {
            throw new Error('Invalid Request.')
          }
          await syncCustomer(customerId, { planId, productId })
          break
        case 'invoice_create':
          break
        default:
          break
      }
      response.json({ status: 'success' })
    } catch (e) {
      errorConsole(e)
      response.status(500).send(e.toString())
    }
  })
})

// Pabbly Pre-Checkout Verifier | Integrator
exports.userSync = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }
        const {
          uid,
          displayName,
          email,
          customClaims = {},
        } = await admin.auth().getUser(request.user.uid)

        let { customer_id: customerId } = customClaims || {}
        // Get customerID from realtime-database
        if (!customerId) {
          const customerIdSnap = await admin
            .database()
            .ref(`users/${uid}/customer_id`)
            .once('value')
          customerId = customerIdSnap.val()
        }
        // TODO: Get customerID from Pabbly
        // Create new Pabbly customerID
        if (!customerId) {
          const {
            data: { id },
          } = await PABBLY_API_CREATE_CUSTOMER(displayName, email)
          customerId = id
        }
        await Promise.all([
          // Sync User details to Pabbly
          PABBLY_API_UPDATE_CUSTOMER(customerId, {
            last_name: displayName,
            email,
          }),
          // Sync Customer to Firebase
          syncUser(uid, {
            ...(customClaims || {}),
            customer_id: customerId,
          }),
        ])
        response.json({ uid, customerId })
      } catch (e) {
        errorConsole(e)
        response.status(500).json(e.toString())
      }
    })
  })
})

// Pabbly Checkout Landing Page Verifier | Integrator
exports.payValidate = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    try {
      const { uid, hostedpage } = request.body
      if (!hostedpage) {
        throw new Error('Invalid Request.')
      }

      // Verify hostedpage from Pabbly
      const {
        data: {
          customer_id: customerId,
          plan_id: planId,
          product_id: productId,
          email_id: emailId,
        },
      } = await PABBLY_API_VERIFYHOSTED(hostedpage)

      // Sync Pabbly Customer to Firebase
      const user = await syncCustomer(customerId, {
        displayName: 'Guest',
        email: emailId,
        planId,
        productId,
        uid,
      })

      response.json({ uid: user.uid, customerId: customer_id })
    } catch (e) {
      errorConsole(e)
      response.status(500).json(e.toString())
    }
  })
})

// Custom Domain Initialization
exports.domainSetup = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }
        // Get User from authentication
        const { uid } = request.user

        // Get websiteKey from request
        const { webKey, webDomain } = request.body
        if (!uid || !webKey || !webDomain) {
          throw new Error('Invalid Request.')
        }

        const userDataRef = admin.database().ref(`users/${uid}/`)
        const webDataRef = userDataRef.child(`sites/${webKey}`)
        const webDataSnapshot = await webDataRef.once('value')
        const webData = webDataSnapshot.val()
        if (!webData || !Object.keys(webData).length) {
          throw new Error('Invalid Request - website does not exist.')
        }

        // Get Customer Active Plans from Pabbly
        const userDataSnapshot = await userDataRef
          .child('customer_id')
          .once('value')
        const customerId = userDataSnapshot.val()
        const {
          data: customerPlans = [],
        } = await PABBLY_API_GET_CUSTOMER_PLANS(customerId)

        // Verify Plans
        const planValid = [PABBLY_SILVER, PABBLY_GOLD]
        const planActive = customerPlans.some(
          ({ plan_id: planId, expiry_date: expiryDate }) =>
            planValid.includes(planId) && new Date(expiryDate) > new Date()
        )
        if (!planActive) {
          throw new Error('Inactive Plan')
        }

        // TODO: Sync Plans
        // syncUser()

        // setup Domain on Cloudflare
        const { id: zoneId, name_servers: zoneNameServers } = await setDomain(
          webDomain
        )

        // Update details in firebase realtime-database
        await Promise.all([
          webDataRef.child('webDomain').set(webDomain),
          webDataRef.child('webZone').set(zoneId),
          webDataRef.child('webNameservers').set(zoneNameServers),
          setWebTimestamp(uid, webKey),
        ])

        // Return nameservers
        return response.json({
          webKey,
          webDomain,
          zoneId,
          zoneNameServers,
        })
      } catch (e) {
        errorConsole(e)
        response.status(500).json(e.toString())
      }
    })
  })
})

// Custom Domain Verification
exports.domainVerify = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }

        const { uid } = request.user
        const { webKey, webDomain: requestWebDomain } = request.body
        if (!uid || !webKey) {
          throw new Error('Invalid Request')
        }

        // Verify Site Exists for User
        const userDataRef = admin.database().ref(`users/${uid}/`)
        const siteDataRef = userDataRef.child(`sites/${webKey}`)
        const siteDataSnapshot = await siteDataRef.once('value')

        let { webZone, webDomain, webNameservers, webBucket } =
          siteDataSnapshot.val() || {}

        if (!requestWebDomain && !webDomain) {
          throw new Error('Invalid Domain Request')
        }

        // Get Customer Active Plans from Pabbly
        const userDataSnapshot = await userDataRef
          .child('customer_id')
          .once('value')
        const customerId = userDataSnapshot.val()
        const {
          data: customerPlans = [],
        } = await PABBLY_API_GET_CUSTOMER_PLANS(customerId)

        // Verify Plans
        const planValid = [PABBLY_SILVER, PABBLY_GOLD]
        const planActive = customerPlans.some(
          ({ plan_id: planId, expiry_date: expiryDate }) =>
            planValid.includes(planId) && new Date(expiryDate) > new Date()
        )
        if (!planActive) {
          throw new Error('Inactive Plan')
        }

        // TODO: Sync Plans
        // syncUser()

        // Clean Up Everything without care!!!
        const [requestWebDomainId, webDomainId] = await Promise.all([
          deleteDomainName(requestWebDomain),
          deleteDomainName(webDomain),
        ])
        await Promise.all([
          webZone ? deleteDomain(webZone).catch(errorConsole) : null,
          requestWebDomainId
            ? deleteDomain(requestWebDomainId).catch(errorConsole)
            : null,
          webDomainId ? deleteDomain(webDomainId).catch(errorConsole) : null,
          webBucket ? deleteHostedBucket(webBucket).catch(errorConsole) : null,
          webDomain ? deleteHostedBucket(webDomain).catch(errorConsole) : null,
          requestWebDomain
            ? deleteHostedBucket(requestWebDomain).catch(errorConsole)
            : null,
        ])

        // Set New Domain
        const zoneDetails = await setDomain(requestWebDomain)
        webZone = zoneDetails.id
        webDomain = zoneDetails.name
        webNameservers = zoneDetails.name_servers
        webBucket = null

        // Create new Bucket
        // https://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html#VirtualHostingCustomURLs
        const bucketName = webDomain
        const bucketHost = `${bucketName}.s3-website.${AWS_REGION}.amazonaws.com`
        await createHostedBucket(bucketName)

        // Fetch All assets from firebase bucket at websiteKey
        const storagePrefixKey = `public/${webKey}/index.html`
        const storageFilesMap = await storageFiles(storagePrefixKey)
        // Push All assets at S3 Bucket
        await putHostedBucket(bucketName, storageFilesMap)

        // Connect DNS
        // Immediate Addition allowed?
        const [dnsResult, connectedResultSnapshot] = await Promise.all([
          await dnsDomain(webZone, {
            type: 'CNAME',
            name: '@',
            content: bucketHost,
          }),
          await siteDataRef.once('value'),
        ])

        // Update details in firebase realtime-database
        await toDatabaseRef(siteDataRef, {
          webDomain,
          webZone,
          webNameservers,
          webBucket: bucketName,
          webHost: bucketHost,
        })

        await setWebTimestamp(uid, webKey)

        response.json({
          ...connectedResultSnapshot.val(),
          plans: customerPlans,
          zoneId: webZone,
          zoneNameServers: webNameservers,
          bucket: bucketName,
          host: bucketHost,
          dns: dnsResult,
        })
      } catch (e) {
        errorConsole(e)
        const { uid } = request.user
        const { webKey, webDomain: requestWebDomain } = request.body

        const siteWebDetailRef = admin
          .database()
          .ref(`users/${uid}/sites/${webKey}`)
        const siteWebDetailSnapshot = await siteWebDetailRef.once('value')
        const { webZone, webBucket, webDomain } = siteWebDetailSnapshot.val()

        // Clean Up Everything without care!!!
        const [requestWebDomainId, webDomainId] = await Promise.all([
          deleteDomainName(requestWebDomain),
          deleteDomainName(webDomain),
        ])
        await Promise.all([
          webZone ? deleteDomain(webZone).catch(errorConsole) : null,
          requestWebDomainId
            ? deleteDomain(requestWebDomainId).catch(errorConsole)
            : null,
          webDomainId ? deleteDomain(webDomainId).catch(errorConsole) : null,
          webBucket ? deleteHostedBucket(webBucket).catch(errorConsole) : null,
          webDomain ? deleteHostedBucket(webDomain).catch(errorConsole) : null,
          requestWebDomain
            ? deleteHostedBucket(requestWebDomain).catch(errorConsole)
            : null,
        ])

        // Clean up Realtime Database
        await Promise.all(
          [
            'webZone',
            'webHost',
            'webBucket',
            'webDomain',
          ].map((siteWebDetailKey) =>
            siteWebDetailRef.child(siteWebDetailKey).remove()
          )
        )

        response.status(500).json(e.toString())
      }
    })
  })
})

// Custom Domain Validate
exports.domainValidate = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }
        // Get User from authentication
        const { uid } = request.user

        // Get websiteKey from request
        const { webKey, webDomain, webZone } = request.body
        if (!uid || !webKey || !webDomain || !webZone) {
          throw new Error('Invalid Request.')
        }

        // Validate Cloudflare
        const checkData = await checkDomain(webZone)

        // Return Checked Data
        return response.json(checkData)
      } catch (e) {
        errorConsole(e)
        response.status(500).json(e.toString())
      }
    })
  })
})

// Custom Domain Removal
// Does not remove firebase-storage files
exports.domainRemove = functions.https.onRequest((request, response) => {
  cleanRequest(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }

        const { uid } = request.user
        const { webKey } = request.body
        if (!uid || !webKey) {
          throw new Error('Invalid Request')
        }

        const siteWebDetailRef = admin
          .database()
          .ref(`users/${uid}/sites/${webKey}`)
        const siteWebDetailSnapshot = await siteWebDetailRef.once('value')
        const siteWebDetail = siteWebDetailSnapshot.val()

        await Promise.all([
          // Cleanup S3 Storage
          siteWebDetail.webBucket &&
            deleteHostedBucket(siteWebDetail.webBucket),
          // Cleanup Cloudflare
          siteWebDetail.webZone && deleteDomain(siteWebDetail.webZone),
        ])

        // Clean up Realtime Database
        await Promise.all(
          [
            'webKey', // Shared Key Name
            'webDomain', // Custom Domain Name
            'webBucket', // S3 Bucket Name
            'webHost', // S3 Bucket URI
            'webZone', // Cloudflare Zone
            'webNameservers', // Cloudflare Zone Nameservers
          ].map((siteWebDetailKey) =>
            siteWebDetailRef.child(siteWebDetailKey).remove()
          )
        )
        response.json({
          status: 'success',
          success: true,
        })
      } catch (e) {
        errorConsole(e)
        response.status(500).json(e.toString())
      }
    })
  })
})
