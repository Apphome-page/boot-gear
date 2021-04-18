import UUID from 'lodash/uniqueId'

import keyValidate from './keyValidate'
import renderTemplate from './render'
import removeWebsite from '../../Dashboard/helpers/removeWebsite'

import APP_KEYS from '../../../config/websiteAppKeys.json'

export default async function upload(
  firebase,
  appKey,
  { templateProps, userId = firebase.auth().currentUser.uid } = {}
) {
  const [keyValidated, { default: Compress }] = await Promise.all([
    keyValidate(firebase, appKey, { userId }),
    import('compress.js'),
  ])

  if (!keyValidated.status) {
    return keyValidated
  }

  const compress = new Compress()

  const storagePath = `public/${appKey}/index.html`
  const databasePath = `users/${userId}/sites/${appKey}`

  const storageRef = firebase.storage().ref(storagePath)
  const databaseRef = firebase.database().ref(databasePath)

  // Pre-fill if existing data exists
  const appDataSet = { ...(keyValidated.data || {}), ...(templateProps || {}) }

  const appIconName = `${UUID('icon-')}-${appDataSet.appIcon.name
    .replace(/[^a-zA-Z0-9.]/gi, '-')
    .toLowerCase()}`
  const appIconPath = `public/${appKey}/bin/${appIconName}`
  const appScreenshotName = `${UUID(
    'icon-'
  )}-${appDataSet.appScreenshot.name
    .replace(/[^a-zA-Z0-9.]/gi, '-')
    .toLowerCase()}`
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
    .compress([appDataSet.appIcon], {
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
    .compress([appDataSet.appScreenshot], {
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

  const DBPromise = Promise.all(
    APP_KEYS.reduce(
      (dbAcc, dbKey) => {
        let dbValue
        switch (dbKey) {
          case 'appIcon':
            dbValue = appIconPath
            break
          case 'appScreenshot':
            dbValue = appScreenshotPath
            break
          default:
            dbValue = appDataSet[dbKey]
            break
        }
        dbAcc.push(databaseRef.child(dbKey).set(dbValue))
        return dbAcc
      },
      [databaseRef.child('timestamp').set(new Date().getTime())]
    )
  )

  await Promise.all([HTMLPromise, IconPromise, ScreenshotPromise, DBPromise])

  return {
    status: true,
  }
}
