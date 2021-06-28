export default function addLinkProtocol(value) {
  const href = value || ''
  return new RegExp(/^\w+:/).test(href)
    ? href
    : `http://${href.replace(/^\//, '')}`
}
