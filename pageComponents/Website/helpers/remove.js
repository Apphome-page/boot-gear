async function removePrefix(storageRef) {
  const { prefixes, items } = await storageRef.listAll()
  await Promise.all(items.map((item) => item.delete()))
  await Promise.all(prefixes.map((prefix) => removePrefix(prefix)))
}

export default async function remove(firebase, userId, appKey) {
  const storageAssetsPrefix = `public/${appKey}`
  const databasePath = `users/${userId}/sites/${appKey}`

  const storagePrefixRef = firebase.storage().ref(storageAssetsPrefix)
  const databaseRef = firebase.database().ref(databasePath)

  await removePrefix(storagePrefixRef)
  await databaseRef.remove()
}
