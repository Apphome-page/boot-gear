import GumHead from '../Theme/Gum/Head'
import GumBody from '../Theme/Gum/Body'

import PurpleHead from '../Theme/Purple/Head'
import PurpleBody from '../Theme/Purple/Body'

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
    case 'purple':
      HeadComponent = PurpleHead
      BodyComponent = PurpleBody
      break
    default:
      HeadComponent = EmptyComponent
      BodyComponent = EmptyComponent
      break
  }
  return { HeadComponent, BodyComponent }
}
