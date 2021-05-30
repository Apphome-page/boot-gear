export default function removeTags(htmlString) {
  return htmlString.replace(/(<([^>]+)>)/gi, ' ')
}
