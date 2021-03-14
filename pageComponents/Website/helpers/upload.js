import Compress from 'compress.js'
import keyValidate from './keyValidate'
import renderTemplate from './render'
import removeWebsite from '../../Dashboard/helpers/removeWebsite'

export default async function upload(
  firebase,
  appKey,
  { templateProps, userId = firebase.auth().currentUser } = {}
) {
  const keyValidated = await keyValidate(firebase, appKey, { userId })
  if (!keyValidated) {
    return
  }

  const compress = new Compress()

  const storagePath = `public/${appKey}/index.html`
  const databasePath = `users/${userId}/sites/${appKey}`

  const storageRef = firebase.storage().ref(storagePath)
  const databaseRef = firebase.database().ref(databasePath)

  const {
    appAbout = '',
    appAddress = '',
    appAndroid = '',
    appDescription = '',
    appDownloads = '',
    appIcon,
    appIos = '',
    appName,
    appRating = '',
    appScreenshot,
    appTitle = '',
    appVideo = '',
  } = templateProps
  const appIconName = appIcon.name.replace(/[^a-zA-Z0-9.]/gi, '-').toLowerCase()
  const appIconPath = `public/${appKey}/bin/${appIconName}`
  const appScreenshotName = appScreenshot.name
    .replace(/[^a-zA-Z0-9.]/gi, '-')
    .toLowerCase()
  const appScreenshotPath = `public/${appKey}/bin/${appScreenshotName}`
  const customMeta = {
    // cacheControl: 'public,max-age=300',
    // Update ownership
    customMetadata: {
      owner: userId,
    },
  }

  // Remove Older Data
  await removeWebsite({
    firebase,
    webKey: appKey,
    removeDomain: false,
    removeStorage: true,
  })

  // Update file in storage
  const HTMLPromise = storageRef.putString(
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

  // Compress & Upload Icon
  const IconPromise = compress
    .compress([appIcon], {
      size: 1,
      quality: 0.75,
      maxWidth: 256,
      maxHeight: 256,
      resize: true,
    })
    .then(([{ data, ext }]) => Compress.convertBase64ToFile(data, ext))
    .then((file) => firebase.storage().ref(appIconPath).put(file, customMeta))

  // Compress & Upload Screenshot
  const ScreenshotPromise = compress
    .compress([appScreenshot], {
      size: 2,
      quality: 0.75,
      maxWidth: 720,
      maxHeight: 720,
      resize: true,
    })
    .then(([{ data, ext }]) => Compress.convertBase64ToFile(data, ext))
    .then((file) =>
      firebase.storage().ref(appScreenshotPath).put(file, customMeta)
    )

  const DBPromise = databaseRef.set({
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

  await Promise.all([HTMLPromise, IconPromise, ScreenshotPromise, DBPromise])
}
