const UUID = () => new Date().getTime().toString(36)

const toDatabaseRef = async (dbRef, objValue) => {
  if (!objValue) {
    return
  }
  const valuePromises = Object.keys(objValue).reduce(
    (keyAcc, objKey) =>
      keyAcc.concat(dbRef.child(objKey).set(objValue[objKey])),
    []
  )
  await Promise.all(valuePromises)
}

module.exports = {
  UUID,
  toDatabaseRef,
}
