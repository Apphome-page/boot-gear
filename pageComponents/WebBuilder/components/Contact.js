import LinkEditor from './Editor/Link'

import { useWebBuilderContext } from '../../../components/Context/WebBuilder'
import { useContextStore } from '../../../components/Context'

import addLinkProtocol from '../helpers/addLinkProtocol'

export default function Contact({ keyName, className = 'icon m-1', children }) {
  const [{ isPreview }] = useContextStore()
  const [keyValue] = useWebBuilderContext(keyName)

  if (!isPreview && !keyValue) {
    return <></>
  }

  return (
    <div className={className}>
      <a href={addLinkProtocol(keyValue)}>
        <LinkEditor keyName={keyName}>{children}</LinkEditor>
      </a>
    </div>
  )
}
