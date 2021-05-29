import classNames from 'classnames'
import { useWebBuilderContext } from '../../../components/Context/WebBuilder'

export default function Nav({ keyName, keyTitle, keyDesc }) {
  const [appKeyValue] = useWebBuilderContext(keyName)
  const getInView = () => {
    const viewContainer = document.getElementById(`container-${keyName}`)
    if (viewContainer) {
      viewContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
      viewContainer.click()
    }
  }
  return (
    <div
      tabIndex='-1'
      role='button'
      title={keyDesc}
      className={classNames('my-1', 'ml-3', 'text-nowrap', 'text-truncate', {
        'text-success': appKeyValue,
        'text-warning': !appKeyValue,
      })}
      onClick={getInView}
      onKeyDown={getInView}
    >
      {keyTitle}
    </div>
  )
}
