export default function NavSection({
  keyName,
  keyTitle,
  keyDesc,
  // keySections,
}) {
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
  return (
    <div
      tabIndex='-1'
      role='button'
      title={keyDesc}
      className='my-1 ml-3 text-nowrap text-truncate'
      onClick={getInView}
      onKeyDown={getInView}
    >
      {keyTitle}
    </div>
  )
}
