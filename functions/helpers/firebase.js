// Sets customClaims to firebase User
// Adds few details in firebase realtime database for reverse-queries
const setUserClaims = async (admin, uid, customClaims) => {
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

const setWebTimestamp = async (admin, uid, webKey) => {
  await admin
    .database()
    .ref(`users/${uid}/sites/${webKey}/timestamp`)
    .set(new Date().getTime())
}

// Get Firebase UserId from Pabbly customerId
// Queries Firebase Realtime Database
const customerToUserId = async (admin, customerId) => {
  const userData = await admin
    .database()
    .ref('users')
    .orderByChild('customer_id')
    .equalTo(customerId)
    .once('value')
  const userValue = userData.val()
  if (!userValue || !Object.keys(userValue).length) {
    return null
  }
  return Object.keys(userValue)[0]
}

const syncCustomer = (admin) => async (
  customerId,
  {
    displayName = 'Guest',
    email = 'email@example.com',
    planId,
    productId,
    uid,
  } = {}
) => {
  let user = null
  const lookupId = await customerToUserId(admin, customerId)
  // fetch user from firebase auth
  if (lookupId) {
    // fetch user from firebase auth
    user = await admin.auth().getUser(lookupId)
  } else if (email) {
    user = await admin.auth().getUserByEmail(email)
  } else if (uid) {
    // If no match, connect with current uid
    user = await admin.auth.getUser(uid)
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
  await setUserClaims(admin, user.uid, {
    ...(user.customClaims || {}),
    customer_id: customerId,
    plan_id: planId,
    product_id: productId,
  })
  return user
}

const storageFiles = (admin) => async (storagePrefixKey) => {
  const storageFilesMap = {}
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
          const storageKey =
            name.replace(new RegExp(`^${storagePrefixKey}`), '') ||
            name.replace(/.*\/(.*?)$/, '$1') ||
            name
          storageFilesMap[storageKey] = downloadBlob
          return true
        })
    )
  )
  return storageFilesMap
}

module.exports = (admin) => ({
  customerToUserId: customerToUserId.bind(null, admin),
  syncCustomer: syncCustomer(admin),
  syncUser: setUserClaims.bind(null, admin),
  setWebTimestamp: setWebTimestamp.bind(null, admin),
  storageFiles: storageFiles(admin),
})
