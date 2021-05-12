import { useCallback } from 'react'
import LinkEditor from '../../../Editor/Link'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

export default function Contact({ keyName, children }) {
  const [{ isPreview }] = useContextStore()
  const [keyValue, setKeyValue] = useWebBuilderContext(keyName)

  const changeAction = useCallback(
    (href) => {
      setKeyValue(href)
    },
    [setKeyValue]
  )

  if (!isPreview && !keyValue) {
    return <></>
  }

  return (
    <div className='icon m-1'>
      <a href={keyValue}>
        <LinkEditor
          id={`container-${keyName}`}
          initText={keyValue}
          onChange={changeAction}
        >
          {children}
        </LinkEditor>
      </a>
    </div>
  )
}
