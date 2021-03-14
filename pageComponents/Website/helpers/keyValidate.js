export default async function keyValidate(
  firebase,
  appKey,
  { userId = firebase.auth().currentUser } = {}
) {
  const storagePath = `public/${appKey}/index.html`
  const databasePath = `users/${userId}/sites/${appKey}`

  const storageRef = firebase.storage().ref(storagePath)
  const databaseRef = firebase.database().ref(databasePath)

  // 1. User Limit
  const userSitesPromise = await firebase
    .database()
    .ref(`users/${userId}/sites`)
    .once('value')
  const userSites = userSitesPromise.val() || {}
  delete userSites[appKey]

  // 2. Path is accessible || User Owns Path
  const snapshot = await databaseRef.once('value')
  const { timestamp: userWebsite } = snapshot.val() || {}
  let freeWebsitePath = true
  try {
    const {
      customMetadata: { owner },
    } = await storageRef.getMetadata()
    freeWebsitePath = !owner || owner === userId
  } catch (e) {
    // Path Does not exist
  }

  // EXIT: Already owns 1 Website || Path is inaccessible
  if (Object.keys(userSites).length > 0) {
    window.alert(`You already have 1 website hosted: ${Object.keys(userSites)}`)
    return false
  }
  if (!(freeWebsitePath || userWebsite)) {
    window.alert(`${appKey} is already taken`)
    return false
  }

  return true
}
