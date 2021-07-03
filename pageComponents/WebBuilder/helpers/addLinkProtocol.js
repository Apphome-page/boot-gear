export default function addLinkProtocol(value, prefix = 'http:/') {
  const href = value || ''
  return new RegExp(/^\w+:/).test(href)
    ? href
    : `${prefix}/${href.replace(/^\/+/, '')}`
}
