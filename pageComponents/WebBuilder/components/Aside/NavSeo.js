import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'

import { useLinkContext } from '../Editor/Link'

export default function NavSeo({ keyName, keyTitle, keyDesc }) {
  const getLink = useLinkContext()
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)

  const clickAction = (event) => {
    event.preventDefault()
    event.stopPropagation()
    getLink({
      title: keyTitle,
      defaultValue: appKeyValue,
      onChange: setAppKeyValue,
    })
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
