import doT from 'dot'
import template from './template.html'

const templateRender = doT.compile(template)

export default function homeTemplate(props) {
  return templateRender(props)
}
