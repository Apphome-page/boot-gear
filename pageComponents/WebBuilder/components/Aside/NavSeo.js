import { useCallback } from 'react'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'

export default function NavSeo({ keyName, keyTitle, keyDesc }) {
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)

  const clickActionCb = useCallback(
    (prevKeyValue) => {
      const newKeyValue = window.prompt(keyTitle, prevKeyValue || '')
      return newKeyValue === null ? prevKeyValue : newKeyValue
    },
    [keyTitle]
  )

  const clickAction = () => {
    setAppKeyValue(clickActionCb)
  }

  return (
    <div
      tabIndex='-1'
      role='button'
      className={classNames('my-1', 'ml-3', 'text-nowrap', 'text-truncate', {
        'text-success': appKeyValue,
        'text-warning': !appKeyValue,
      })}
      title={keyDesc}
      onClick={clickAction}
      onKeyDown={clickAction}
    >
      {keyTitle}
    </div>
  )
}
