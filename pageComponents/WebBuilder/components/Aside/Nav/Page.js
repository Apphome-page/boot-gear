import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import { usePopContext, POPUP_TYPES } from '../../Context/Pop'

export default function NavPage({ keyName, keyTitle, keyDesc }) {
  const getPop = usePopContext()
  const [appKeyValue] = useWebBuilderContext(keyName)

  const clickAction = () => {
    getPop({
      title: keyTitle,
      type: POPUP_TYPES.TEXT_AREA,
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
