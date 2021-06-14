const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

export default function addLinkProtocol(value) {
  const href = value || ''
  return new RegExp(/^\w+:/).test(href)
    ? href
    : `${SITE_URL}/${href.replace(/^\//, '')}`
}
