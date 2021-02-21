import doT from 'dot'

import templateGum from './templateGum.html'
import templateGrass from './templateGrass.html'
import templateWave from './templateWave.html'

const template = {
  gum: doT.compile(templateGum),
  grass: doT.compile(templateGrass),
  wave: doT.compile(templateWave),
}

export default function renderTemplate(props) {
  return template[props.theme](props)
}
