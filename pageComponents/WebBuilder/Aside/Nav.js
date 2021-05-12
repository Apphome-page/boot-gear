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
      className={appKeyValue ? 'text-success' : 'text-warning'}
      onClick={getInView}
      onKeyDown={getInView}
    >
      {keyTitle}
    </div>
  )
}
