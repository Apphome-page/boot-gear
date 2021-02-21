import keyValidate from './keyValidate'
import renderTemplate from './render'
import removeWebsite from '../../Dashboard/helpers/removeWebsite'

export default async function upload(
  firebase,
  appKey,
  { templateProps, userId = firebase.auth().currentUser } = {}
) {
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

  const keyValidated = await keyValidate(firebase, appKey, { userId })
  if (!keyValidated) {
    return
  }

  const {
    appAbout,
    appAddress,
    appAndroid,
    appDescription,
    appDownloads,
    appIcon,
    appIos,
    appName,
    appRating,
    appScreenshot,
    appTitle,
    appVideo,
  } = templateProps
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
    appAbout,
    appAddress,
    appAndroid,
    appDescription,
    appDownloads,
    appIos,
    appName,
    appRating,
    appTitle,
    appVideo,
    appIcon: appIconPath,
    appScreenshot: appScreenshotPath,
    timestamp: new Date().getTime(),
  })
}
