/* eslint-disable promise/always-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('cross-fetch')
const cors = require('cors')({ origin: true })
const base64 = require('base-64')
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  PutBucketWebsiteCommand,
  PutBucketPolicyCommand,
  DeleteBucketCommand,
} = require('@aws-sdk/client-s3')

// INIT CLOUD FUNCTION
admin.initializeApp()

// Secrets
const {
  pabbly: {
    username: PABBLY_USERNAME,
    password: PABBLY_PASSWORD,
    silver: PABBLY_SILVER,
    gold: PABBLY_GOLD,
  } = {},
  aws: { id: AWS_ACCESS_ID, key: AWS_ACCESS_KEY },
} = functions.config()
const PABBLY_AUTH_HEAD = `Basic ${base64.encode(
  `${PABBLY_USERNAME}:${PABBLY_PASSWORD}`
)}`

// AWS Configs
const AWS_REGION = 'ap-south-1'
const UUID = () => new Date().getTime().toString(36)

// PABBLY APIs
const PABBLY_API_CREATE_CUSTOMER = async (displayName, email) => {
  let resBody = {}
  const response = await fetch('https://payments.pabbly.com/api/v1/customer', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: PABBLY_AUTH_HEAD,
    },
    body: JSON.stringify({
      first_name: 'User',
      last_name: displayName,
      email_id: email,
    }),
  })
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_GET_CUSTOMER_PLANS = async (customerId) => {
  let resBody = {}
  if (!customerId) {
    throw new Error('No customerId')
  }
  const response = await fetch(
    `https://payments.pabbly.com/api/v1/subscriptions/${customerId}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: PABBLY_AUTH_HEAD,
      },
    }
  )
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_UPDATE_CUSTOMER = async (
  customer_id,
  customerDetails = {}
) => {
  const response = await fetch(
    `https://payments.pabbly.com/api/v1/customer/${customer_id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: PABBLY_AUTH_HEAD,
      },
      body: JSON.stringify(customerDetails),
    }
  )
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_VERIFYHOSTED = async (hostedpage) => {
  const response = await fetch(
    'https://payments.pabbly.com/api/v1/verifyhosted',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: PABBLY_AUTH_HEAD,
      },
      body: JSON.stringify({
        hostedpage,
      }),
    }
  )
  const resBody = await response.json()
  if (response.status >= 400) {
    throw new Error('Something Went Wrong.')
  }
  return resBody
}

// eslint-disable-next-line consistent-return
const validateFirebaseIdToken = async (request, response, next) => {
  let idToken
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = request.headers.authorization.split('Bearer ')[1]
  } else if (request.cookies && request.cookies.__session) {
    idToken = request.cookies.__session
  } else {
    return next(new Error('Unauthorized'))
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    request.user = decodedIdToken
  } catch (e) {
    return next(e)
  }
  next()
}

const customerToUserId = async (customer_id) => {
  const userData = await admin
    .database()
    .ref('users')
    .orderByChild('customer_id')
    .equalTo(customer_id)
    .once('value')
  const userValue = userData.val()
  if (!userValue || !Object.keys(userValue).length) {
    return null
  }
  return Object.keys(userValue)[0]
}

const syncUser = async (uid, customClaims = {}) => {
  // Set customerId in customerClaim
  await admin.auth().setCustomUserClaims(uid, { ...(customClaims || {}) })
  // Set Shared Claims in Realtime Database
  const shareClaims = ['customer_id', 'plan_id', 'product_id']
  await Promise.all(
    shareClaims.map((claimLabel) => {
      const claimValue = customClaims[claimLabel]
      if (claimValue) {
        return admin
          .database()
          .ref(`users/${uid}/${claimLabel}`)
          .set(claimValue)
      }
      return null
    })
  )
}

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
  cors(request, response, async () => {
    // TODO: Add Basic Authentication (same username/password as pabbly)
    try {
      const {
        event_type: eventType,
        event_source: eventSource,
        data,
      } = request.body
      switch (eventType) {
        case 'customer_create':
          // TODO: Anonymous Checkouts
          // Check if email exists
          // if yes: then Sync
          // if no: then Create Related new Anonymous User
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
          let user = null
          const { customer_id, plan_id, product_id } = data || {}
          if (!customer_id && !plan_id && !product_id) {
            throw new Error('Invalid Request.')
          }

          // fetch uid from firebase realtime database & user from firebase Auth
          if (!user && customer_id) {
            const lookupId = await customerToUserId(customer_id)
            // fetch user from firebase auth
            if (lookupId) {
              user = await admin.auth().getUser(lookupId)
            }
          }

          // Create anonymous User
          if (!user) {
            user = await admin.auth().createUser({
              displayName,
              email,
              emailVerified: false,
            })
            user.sendEmailVerification()
          }

          // Sync User customClaim
          const updatedClaims = {
            ...(user.customClaims || {}),
            customer_id,
            plan_id,
            product_id,
          }
          await syncUser(user.uid, updatedClaims)
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
  cors(request, response, async () => {
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

        let { customer_id } = customClaims || {}
        if (!customer_id) {
          const customerIdSnap = await admin
            .database()
            .ref(`users/${uid}/customer_id`)
            .once('value')
          customer_id = customerIdSnap.val()
        }
        if (!customer_id) {
          const {
            data: { id },
          } = await PABBLY_API_CREATE_CUSTOMER(displayName, email)
          customer_id = id
        }

        await Promise.all([
          // Sync User details to Pabbly
          PABBLY_API_UPDATE_CUSTOMER(customer_id, {
            last_name: displayName,
            email,
          }),
          // Sync Customer to Firebase
          syncUser(uid, {
            ...(customClaims || {}, customer_id),
          }),
        ])
        response.json({ uid, customerId: customer_id })
      } catch (e) {
        response.status(500).json(e.toString())
      }
    })
  })
})

// Pabbly Checkout Landing Page Verifier | Integrator
exports.payValidate = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      let user = null
      const { uid, hostedpage } = request.body

      if (!hosted) {
        throw new Error('Invalid Request.')
      }

      // Verify hostedpage from Pabbly
      const {
        data: { customer_id, plan_id, product_id, email_id },
      } = await PABBLY_API_VERIFYHOSTED(hostedpage)

      // Get firebase auth uid using customer_id from realtime database
      const lookupId = await customerToUserId(customer_id)

      if (lookupId) {
        // fetch user from firebase auth
        user = await admin.auth().getUser(lookupId)
      } else if (email_id) {
        user = await admin.auth().getUserByEmail(email_id)
      } else if (uid) {
        // If no match, connect with current uid
        user = await admin.auth.getUser(uid)
      }

      // if no user exists, create anonymous user
      if (!user) {
        user = await admin.auth().createUser({
          displayName: 'Guest',
          email: email_id,
          emailVerified: false,
        })
        user.sendEmailVerification()
      }

      // update & sync user customClaims
      await syncUser(user.uid, {
        ...(user.customClaims || {}),
        customer_id,
        plan_id,
        product_id,
      })
      response.json({ uid: user.uid, customerId: customer_id })
    } catch (e) {
      response.status(500).json(e.toString())
    }
  })
})

exports.webHost = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }

        // Get User from authentication
        const { uid } = request.user

        // Get websiteKey from request
        const { website_key: websiteKey } = request.body
        if (!uid || !websiteKey) {
          throw new Error('Invalid Request')
        }

        // Get User customer_id, plan_id, & Website Details from website_key
        const customerIdSnap = await admin
          .database()
          .ref(`users/${uid}`)
          .once('value')
        const {
          customer_id: customerId,
          sites: { [websiteKey]: websiteData = {} } = {},
        } = customerIdSnap.val()
        const userDataBucketName = admin.database.ref(
          `users/${uid}/sites/${websiteKey}/bucketName`
        )

        // Get Customer Active Plans from Pabbly
        const {
          data: customerPlans = [],
        } = await PABBLY_API_GET_CUSTOMER_PLANS(customerId)

        // TODO: Sync customer_id & plan_id

        // Verify if plan is active
        const planValid = [PABBLY_SILVER, PABBLY_GOLD]
        const planActive = customerPlans.some(
          ({ plan_id: planId, expiry_date: expiryDate }) =>
            planValid.includes(planId) && new Date(expiryDate) > new Date()
        )
        if (!planActive) {
          throw new Error('Inactive Plan')
        }

        // Instantiate S3 Client
        const s3 = new S3Client({
          credentials: {
            accessKeyId: AWS_ACCESS_ID,
            secretAccessKey: AWS_ACCESS_KEY,
          },
          region: AWS_REGION,
        })

        // Remove Existing S3 Bucket
        if (websiteData.bucketName) {
          await s3.send(
            new DeleteBucketCommand({
              Bucket: websiteData.bucketName,
            })
          )
          await userDataBucketName.remove()
        }

        // Setup a new S3 Bucket
        const bucketName = `applanding-page-${appKey}-${UUID()}`
        await s3.send(new CreateBucketCommand({ Bucket: bucketName }))
        // Clear `Block all public access`
        await s3.send(
          new PutBucketWebsiteCommand({
            Bucket: bucketName,
            ContentMD5: '',
            WebsiteConfiguration: {
              ErrorDocument: {
                Key: 'error.html',
              },
              IndexDocument: {
                Suffix: 'index.html',
              },
            },
          })
        )
        // Attach a bucket policy
        await s3.send(
          new PutBucketPolicyCommand({
            Bucket: bucketName,
            Policy: JSON.stringify({
              Version: '2012-10-17',
              Statement: [
                {
                  Sid: 'PublicReadGetObject',
                  Effect: 'Allow',
                  Principal: '*',
                  Action: 's3:GetObject',
                  Resource: `arn:aws:s3:::${bucketName}/*`,
                },
              ],
            }),
          })
        )
        // Update Firebase Realtime Database
        await userDataBucketName.set(bucketName)

        // Fetch All assets from firebase bucket at websiteKey
        const storagePrefixKey = `public/${appKey}`
        const storageFiles = {}
        const [storageItems] = await admin.storage().bucket().getFiles({
          prefix: storagePrefixKey,
        })
        await Promise.all(
          storageItems.map((storageItem) =>
            storageItem
              .download()
              .then((downloadResponse) => downloadResponse[0])
              .then(async (downloadBlob) => {
                const [{ name }] = await storageItem.getMetadata()
                const storageKey = name.replace(
                  new RegExp(`^${storagePrefixKey}`),
                  ''
                )
                storageFiles[storageKey] = downloadBlob
              })
          )
        )

        // Save Bucket Details into Firebase Realtime Database
        // Push All assets at S3 Bucket
        await Promise.all(
          Object.keys(storageFiles).map((storageKey) =>
            s3.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: storageKey,
                Body: storageFiles[storageKey],
              })
            )
          )
        )
        // Save Endpoint in Storage
        response.send(
          `http://${bucketName}.s3-website.${AWS_REGION}.amazonaws.com`
        )
        // Create Cloudfront DNS
        // Point to S3 Bucket
        // return NS from Route 53
      } catch (e) {
        response.status(500).json(e.toString())
      }
    })
  })
})
