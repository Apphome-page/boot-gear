import PurpleHead from '../Theme/Purple/Head'
import PurpleBody from '../Theme/Purple/Body'
import PurpleAsideConfig from '../Theme/Purple/config/aside.json'

import SaxeHead from '../Theme/Saxe/Head'
import SaxeBody from '../Theme/Saxe/Body'
import SaxeAsideConfig from '../Theme/Saxe/config/aside.json'

import RisqHead from '../Theme/Risq/Head'
import RisqBody from '../Theme/Risq/Body'
import RisqAsideConfig from '../Theme/Risq/config/aside.json'

function EmptyComponent() {
  return <></>
}

export default function getThemeComponent(theme) {
  let HeadComponent = EmptyComponent
  let BodyComponent = EmptyComponent
  let asideRenderProps = []
  // TODO: Lazy-Fetch Theme Component Per Requirement
  switch (theme) {
    case 'purple':
      HeadComponent = PurpleHead
      BodyComponent = PurpleBody
      asideRenderProps = PurpleAsideConfig
      break
    case 'saxe':
      HeadComponent = SaxeHead
      BodyComponent = SaxeBody
      asideRenderProps = SaxeAsideConfig
      break
    case 'risq':
      HeadComponent = RisqHead
      BodyComponent = RisqBody
      asideRenderProps = RisqAsideConfig
      break
    default:
      break
  }
  return { HeadComponent, BodyComponent, asideRenderProps }
}
