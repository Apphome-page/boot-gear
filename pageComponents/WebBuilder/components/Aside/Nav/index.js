import NavItem from './Item'
import NavSection from './Section'

import webBuilderKeyConfig from './config/builderKeys.json'

export default function Nav() {
  return (
    <>
      {webBuilderKeyConfig.map(
        ([atomKey, atomTitle, atomDesc, atomSections]) => {
          const AtomContainer = atomSections ? NavSection : NavItem
          return (
            <AtomContainer
              key={atomKey}
              keyName={atomKey}
              keyTitle={atomTitle}
              keyDesc={atomDesc}
              keySections={atomSections}
            />
          )
        }
      )}
    </>
  )
}
