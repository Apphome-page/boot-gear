import fetch from 'cross-fetch'

const ENV_PREFIX =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

export default async function urlToFile(url) {
  if (!url || typeof url !== 'string') {
    return null
  }
  const remoteName =
    (url.match(/^(?:.+\/)(.+?)(?:[?#].*)$/) || [])[1] || 'file.dat'
  const remoteUrl = `${ENV_PREFIX.replace(/\/?$/, '')}/${url.replace(
    /^\/?/,
    ''
  )}`
  const remoteData = await fetch(remoteUrl)
  const remoteBlob = await remoteData.blob()
  const fileData = new File([remoteBlob], remoteName, {
    type: remoteBlob.type,
  })
  return fileData
}
