import fetch from 'cross-fetch'

const FIRECLOUD_DOMAIN_CONNECT =
  process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_CONNECT

export default async function domainConnect(idToken, appKey) {
  // Update s3
  const connectResp = await fetch(FIRECLOUD_DOMAIN_CONNECT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      webKey: appKey,
    }),
  })
  const setupData = await connectResp.json()
  if (connectResp.status >= 400) {
    throw new Error(`Something went wrong. ${JSON.stringify(setupData)}`)
  }
}
