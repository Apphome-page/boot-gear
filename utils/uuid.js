export default function uuid(append = '') {
  const prefix = new Date().getTime().toString(36)
  const suffix = Math.random().toString(36).slice(2)
  return `${prefix}-${suffix}${append ? '-' : ''}${append}`
}
