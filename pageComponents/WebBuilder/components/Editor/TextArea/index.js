import { memo } from 'react'

import { useContextStore } from '../../../../../components/Context'

import { usePopContext, POPUP_TYPES } from '../../Context/Pop'

function TextAreaEditor({ keyName, keyTitle, children }) {
  const getPop = usePopContext()
  const [{ isPreview }] = useContextStore()

  const changeAction = (event) => {
    event.preventDefault()
    event.stopPropagation()
    getPop({
      title: keyTitle || '',
      type: POPUP_TYPES.TEXT_AREA,
      keyName,
    })
  }

  if (!isPreview) {
    return <div id={`container-${keyName}`}>{children}</div>
  }

  return (
    <div
      id={`container-${keyName}`}
      tabIndex='-1'
      role='button'
      onClick={changeAction}
      onKeyDown={changeAction}
    >
      {children}
    </div>
  )
}

export default memo(TextAreaEditor)
