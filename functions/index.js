const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('cross-fetch')
const cors = require('cors')({ origin: true })
const base64 = require('base-64')

// INIT CLOUD FUNCTION
admin.initializeApp()

// Secrets
const {
  pabbly: { username: PABBLY_USERNAME, password: PABBLY_PASSWORD } = {},
} = functions.config()
const PABBLY_AUTH_HEAD =
  'Basic ' + base64.encode(PABBLY_USERNAME + ':' + PABBLY_PASSWORD)

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
      'Something Went Wrong.' + resBody && resBody.message
        ? ' ' + resBody.message
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
    'https://payments.pabbly.com/api/v1/customer/' + customer_id,
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
      'Something Went Wrong.' + resBody && resBody.message
        ? ' ' + resBody.message
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
    next(new Error('Unauthorized'))
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    request.user = decodedIdToken
  } catch (e) {
    next(e)
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
  await admin
    .auth()
    .setCustomUserClaims(uid, Object.assign({}, customClaims || {}))
  // Set Shared Claims in Realtime Database
  const shareClaims = ['customer_id', 'plan_id', 'product_id']
  for (let i = 0; i < shareClaims.length; i += 1) {
    const claimLabel = shareClaims[i]
    const claimValue = customClaims[claimLabel]
    if (claimValue) {
      await admin
        .database()
        .ref('users/' + uid + '/' + claimLabel)
        .set(claimValue)
    }
  }
  return
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
//     } = PABBLY_API_CREATE_CUSTOMER(displayName, email)
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

//TODO: Pabbly webhook Events
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
          const updatedClaims = Object.assign({}, user.customClaims || {}, {
            customer_id,
            plan_id,
            product_id,
          })
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
    return
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
            .ref('users/' + uid + '/customer_id')
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
          syncUser(
            uid,
            Object.assign({}, customClaims || {}, {
              customer_id,
            })
          ),
        ])
        response.json({ uid, customerId: customer_id })
      } catch (e) {
        response.status(500).json(e.toString())
      }
      return
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
      await syncUser(
        user.uid,
        Object.assign({}, user.customClaims || {}, {
          customer_id,
          plan_id,
          product_id,
        })
      )
      response.json({ uid: user.uid, customerId: customer_id })
    } catch (e) {
      response.status(500).json(e.toString())
    }
    return
  })
})

exports.customSite = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    validateFirebaseIdToken(request, response, async (error) => {
      try {
        if (error instanceof Error) {
          throw error
        }
        // Get User from authentication
        // Get User customer_id & plan_id
        // Get websiteKey from request
        // Get Website Details from websiteKey
        // Get Customer Active Plans from Pabbly
        // Sync customer_id & plan_id
        // Verify if plan is active
        // Fetch All assets from firebase bucket at websiteKey
        // Refer: https://docs.aws.amazon.com/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html
        // Create new S3 Bucket
        // Clear `Block all public access`
        // Attach a bucket policy
        // Push All assets at S3 Bucket
        // Create Route53
        // Point to S3 Bucket
        // return NS from Route 53
      } catch (e) {
        response.status(500).json(e.toString())
      }
    })
  })
})
