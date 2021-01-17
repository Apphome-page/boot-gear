import renderTemplate from './index'
import removeWebsite from '../../Dashboard/helpers/removeWebsite'

export default async function upload(firebase, userId, appKey, templateProps) {
  await removeWebsite({
    firebase,
    webKey: appKey,
    removeDomain: false,
    removeStorage: true,
  })

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
    return
  }
  if (!(freeWebsitePath || userWebsite)) {
    window.alert(`${appKey} is already taken`)
    return
  }

  const { appIcon, appScreenshot } = templateProps
  const appIconName = appIcon.name.replace(/[^a-zA-Z0-9.]/gi, '-').toLowerCase()
  const appIconPath = `public/${appKey}/bin/${appIconName}`
  const appScreenshotName = appScreenshot.name
    .replace(/[^a-zA-Z0-9.]/gi, '-')
    .toLowerCase()
  const appScreenshotPath = `public/${appKey}/bin/${appScreenshotName}`
  const customMeta = {
    // cacheControl: 'public,max-age=300',
    customMetadata: {
      owner: userId,
    },
  }

  // Update file in storage
  await storageRef.putString(
    renderTemplate({
      ...templateProps,
      appKey,
      appIconName,
      appScreenshotName,
    }),
    'raw',
    {
      ...customMeta,
      contentType: 'text/html; charset=utf-8',
    }
  )
  firebase.storage().ref(appIconPath).put(appIcon, customMeta)
  firebase.storage().ref(appScreenshotPath).put(appScreenshot, customMeta)
  // Update ownership
  await databaseRef.set({
    ...templateProps,
    appIcon: appIconPath,
    appScreenshot: appScreenshotPath,
    timestamp: new Date().getTime(),
  })
}
