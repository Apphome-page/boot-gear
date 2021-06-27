import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

export default function NavPage({ keyName, keyTitle, keyDesc, keyAction }) {
  const [appKeyValue] = useWebBuilderContext(keyName)

  const clickAction = () => {
    keyAction({
      title: keyTitle,
      keyName,
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
