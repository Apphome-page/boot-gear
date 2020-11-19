const functions = require('firebase-functions')
const admin = require('firebase-admin')
const fetch = require('cross-fetch')
const cors = require('cors')({ origin: true })
const base64 = require('base-64')

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

// INIT CLOUD FUNCTION
admin.initializeApp()

const syncUser = async (uid, customClaims = {}) => {
  // Set customerId in customerClaim
  await admin
    .auth()
    .setCustomUserClaims(uid, Object.assign({}, customClaims || {}))
  // Set customerId-uid in Realtime Database
  if (customClaims.customer_id) {
    await admin
      .database()
      .ref('ccLookup/' + customClaims.customer_id)
      .set(uid)
  }
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

exports.userSync = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    validateFirebaseIdToken(request, response, async () => {
      try {
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
            .once(claimValue)
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

// TODO: REMOVE DEBUG
// exports.userAll = functions.https.onRequest(async (request, response) => {
//   const allUsers = await admin.auth().listUsers()
//   response.json(allUsers)
// })

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
          const { customer_id, plan_id, product_id } = data || {}
          let user = null

          // fetch uid from firebase realtime database & user from firebase Auth
          if (!user && customer_id) {
            const lookupSnap = await admin
              .database()
              .ref('ccLookup/' + customer_id)
              .once('value')
            const lookupId = lookupSnap.val()
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

// Pabbly Checkout Landing Page Verifier | Integrator
exports.payValidate = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      let user = null
      const { uid, hostedpage } = request.body

      // Verify hostedpage from Pabbly
      const {
        data: { customer_id, plan_id, product_id, email_id },
      } = await PABBLY_API_VERIFYHOSTED(hostedpage)

      // Get firebase auth uid using customer_id from realtime database
      const lookupSnap = await admin
        .database()
        .ref('ccLookup/' + customer_id)
        .once('value')
      const lookupId = lookupSnap.val()

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
