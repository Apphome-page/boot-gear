const functions = require('firebase-functions')
const admin = require('firebase-admin')
const base64 = require('base-64')
const Cloudflare = require('cloudflare')
const { S3Client } = require('@aws-sdk/client-s3')

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
const { UUID } = require('./helpers')
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
const { syncUser, syncCustomer, storageFiles } = require('./helpers/firebase')(
  admin
)
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
//       console.error(e)
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
        if (!customerId) {
          const customerIdSnap = await admin
            .database()
            .ref(`users/${uid}/customer_id`)
            .once('value')
          customerId = customerIdSnap.val()
        }
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
        ])

        // Return nameservers
        return response.json({
          webKey,
          webDomain,
          zoneId,
          zoneNameServers,
        })
      } catch (e) {
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
        const { webKey } = request.body
        if (!uid || !webKey) {
          throw new Error('Invalid Request')
        }

        // Verify Site Exists for User
        const userDataRef = admin.database().ref(`users/${uid}/`)
        const siteDataRef = userDataRef.child(`sites/${webKey}`)
        const siteDataSnapshot = await siteDataRef.once('value')
        const { webZone, webDomain, webNameservers, webBucket } =
          siteDataSnapshot.val() || {}
        if (!webZone || !webDomain || !webNameservers) {
          throw new Error('Invalid webKey')
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

        // Verify domain nameservers on Cloudflare
        const domainResult = await checkDomain(webZone)
        const { active: webActive, paused: webPaused } = domainResult
        if (webPaused || !webActive) {
          response.json({
            active: webActive,
            paused: webPaused,
          })
          return
        }

        // Remove Existing S3 Bucket
        if (webBucket) {
          await deleteHostedBucket(webBucket)
          await siteDataRef.child('webBucket').remove()
          await siteDataRef.child('webHost').remove()
        }

        // Create new Bucket
        // https://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html#VirtualHostingCustomURLs
        const bucketName = webDomain
        const bucketHost = `${bucketName}.s3-website.${AWS_REGION}.amazonaws.com`
        await createHostedBucket(bucketName)

        // Update Firebase Realtime Database
        await siteDataRef.child('webBucket').set(bucketName)
        await siteDataRef.child('webHost').set(bucketHost)

        // Fetch All assets from firebase bucket at websiteKey
        const storagePrefixKey = `public/${webKey}/`
        const storageFilesMap = await storageFiles(storagePrefixKey)
        // Push All assets at S3 Bucket
        await putHostedBucket(bucketName, storageFilesMap)

        // Connect DNS
        const dnsResult = await dnsDomain(webZone, {
          type: 'CNAME',
          name: '@',
          content: bucketHost,
        })

        const connectedWebDataSnapshot = await siteDataRef.once('value')
        const connectedWebData = connectedWebDataSnapshot.val()

        response.json({
          ...connectedWebData,
          active: webActive,
          paused: webPaused,
          domain: domainResult,
          dns: dnsResult,
          plans: customerPlans,
        })
      } catch (e) {
        let errorString = e.toString()
        try {
          const { uid } = request.user
          const { webKey } = request.body
          const siteWebDetailRef = admin
            .database()
            .ref(`users/${uid}/sites/${webKey}`)
          const siteWebDetailSnapshot = await siteWebDetailRef.once('value')
          const siteWebDetail = siteWebDetailSnapshot.val()

          if (siteWebDetail.webBucket) {
            // Cleanup S3 Storage
            await deleteHostedBucket(siteWebDetail.webBucket)
            // TODO: Disconnect DNS
          }

          // Clean up Realtime Database
          await Promise.all(
            ['webHost', 'webBucket'].map((siteWebDetailKey) =>
              siteWebDetailRef.child(siteWebDetailKey).remove()
            )
          )
        } catch (e2) {
          errorString = `${errorString} || ${e2.toString()}`
        }
        response.status(500).json(errorString)
      }
    })
  })
})

// Custom Domain Removal
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
        response.status(500).json(e.toString())
      }
    })
  })
})
