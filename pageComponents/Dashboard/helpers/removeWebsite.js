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

  if (removeDomain) {
    const idToken = await firebase.auth().currentUser.getIdToken()
    const siteDataSnapshot = await firebase
      .database()
      .ref(databasePath)
      .once('value')
    const siteData = siteDataSnapshot.val()
    if (
      // custom domain
      siteData.webDomain ||
      // s3 bucket
      siteData.webBucket ||
      // cloudflare zone
      siteData.webZone
    ) {
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
    }
  }

  if (removeStorage) {
    const storagePrefixRef = firebase.storage().ref(storageAssetsPrefix)
    const databaseRef = firebase.database().ref(databasePath)

    await removePrefix(storagePrefixRef)
    await databaseRef.remove()
  }
}
