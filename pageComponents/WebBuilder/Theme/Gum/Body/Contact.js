import LinkEditor from '../../../Editor/Link'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

export default function Contact({ keyName, children }) {
  const [{ isPreview }] = useContextStore()
  const [keyValue] = useWebBuilderContext(keyName)

  if (!isPreview && !keyValue) {
    return <></>
  }

  return (
    <div className='icon m-1'>
      <a href={keyValue}>
        <LinkEditor keyName={keyName}>{children}</LinkEditor>
      </a>
    </div>
  )
}
