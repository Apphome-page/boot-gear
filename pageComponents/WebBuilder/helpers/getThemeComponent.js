import PurpleHead from '../Theme/Purple/Head'
import PurpleBody from '../Theme/Purple/Body'
import PurpleAsideConfig from '../Theme/Purple/config/aside.json'

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
    default:
      break
  }
  return { HeadComponent, BodyComponent, asideRenderProps }
}
