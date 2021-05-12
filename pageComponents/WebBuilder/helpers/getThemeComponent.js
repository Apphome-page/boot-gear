import GumHead from '../Theme/Gum/Head'
import GumBody from '../Theme/Gum/Body'

function EmptyComponent() {
  return <></>
}

export default function getThemeComponent(theme) {
  let HeadComponent = null
  let BodyComponent = null
  // TODO: Lazy-Fetch Theme Component Per Requirement
  switch (theme) {
    case 'gum':
      HeadComponent = GumHead
      BodyComponent = GumBody
      break
    default:
      HeadComponent = EmptyComponent
      BodyComponent = EmptyComponent
      break
  }
  return { HeadComponent, BodyComponent }
}
