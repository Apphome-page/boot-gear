import { memo, useEffect, useReducer } from 'react'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

function RawKeySection({ keyName, keyAction }) {
  const [keyValue] = useWebBuilderContext(keyName)
  useEffect(() => {
    if (keyValue) {
      keyAction({ [keyName]: true })
    }
  }, [keyAction, keyName, keyValue])
  return <></>
}

const KeySection = memo(RawKeySection)

function RawNavSection({ keyName, keyTitle, keyDesc, keySections = [] }) {
  const [keySectionsStatus, setKeySectionsStatus] = useReducer(
    (prevKeySectionStatus, currentKeySection) => ({
      ...prevKeySectionStatus,
      ...currentKeySection,
    }),
    {},
    (initialValue) =>
      keySections.reduce(
        (keyAcc, keySectionName) =>
          Object.assign(keyAcc, { [keySectionName]: false }),
        initialValue
      )
  )

  const getInView = () => {
    const viewContainer = document.getElementById(`container-${keyName}`)
    if (viewContainer) {
      viewContainer.scrollIntoView({
        behavior: 'smooth',
        // block: 'center',
        // inline: 'center',
      })
    }
  }

  const allKeysStatus = Object.keys(keySectionsStatus).every(
    (keyValue) => keySectionsStatus[keyValue]
  )

  return (
    <div
      tabIndex='-1'
      role='button'
      title={keyDesc}
      className={classNames('my-1 ml-3 text-nowrap text-truncate', {
        'text-warning': !allKeysStatus,
        'text-success': allKeysStatus,
      })}
      onClick={getInView}
      onKeyDown={getInView}
    >
      {keySections.map((keySectionName, keySectionIndex) => (
        <KeySection
          key={keySectionIndex}
          keyName={keySectionName}
          keyAction={setKeySectionsStatus}
        />
      ))}
      {keyTitle}
    </div>
  )
}

const NavSection = memo(RawNavSection)

export default NavSection
