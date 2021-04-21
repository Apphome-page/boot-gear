import APP_KEYS from '../../../config/websiteAppKeys.json'
import WEB_KEYS from '../../../config/websiteWebKeys.json'

const FIRECLOUD_DOMAIN_REMOVE = process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_REMOVE

async function removePrefix(storageRef) {
  const { prefixes, items } = await storageRef.listAll()
  await Promise.all(items.map((item) => item.delete()))
  await Promise.all(prefixes.map((prefix) => removePrefix(prefix)))
}

export default async function removeWebsite({
  firebase,
  webKey,
  removeDomain = true,
  removeStorage = true,
  removeMeta = false,
}) {
  if (!firebase) {
    return
  }

  const userId = (firebase.auth().currentUser || {}).uid
  if (!userId || !webKey) {
    return
  }

  const storageAssetsPrefix = `public/${webKey}`
  const databasePath = `users/${userId}/sites/${webKey}`

  const databaseRef = firebase.database().ref(databasePath)

  const siteDataSnapshot = await databaseRef.once('value')
  const siteData = siteDataSnapshot.val() || {}

  if (
    removeDomain &&
    // custom domain
    (siteData.webDomain ||
      // s3 bucket
      siteData.webBucket ||
      // cloudflare zone
      siteData.webZone)
  ) {
    const idToken = await firebase.auth().currentUser.getIdToken()
    const domainResp = await fetch(FIRECLOUD_DOMAIN_REMOVE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        webKey,
      }),
    })
    const verifyData = await domainResp.json()
    if (domainResp.status >= 400) {
      throw new Error(`Something went wrong. ${JSON.stringify(verifyData)}`)
    }
    await Promise.all(
      WEB_KEYS.reduce((remAcc, remKey) => {
        delete siteData[remKey]
        remAcc.push(databaseRef.child(remKey).remove())
        return remAcc
      }, [])
    )
  }

  if (removeStorage) {
    const storagePrefixRef = firebase.storage().ref(storageAssetsPrefix)
    await removePrefix(storagePrefixRef)
    await databaseRef.set(
      APP_KEYS.reduce((remAcc, remKey) => {
        delete siteData[remKey]
        return { ...remAcc, [remKey]: null }
      }, {})
    )
  }

  // Only timestamp remains
  if (removeMeta || Object.keys(siteData).length <= 1) {
    await databaseRef.remove()
  }
}
