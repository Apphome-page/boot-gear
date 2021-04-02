export default function imageLoader({
  src = '/img/logo.png',
  width = -1,
  quality = -1,
}) {
  return `${src}?w=${width}&q=${quality}`
}
