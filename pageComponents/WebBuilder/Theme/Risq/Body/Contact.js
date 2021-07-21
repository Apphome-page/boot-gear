import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import LinkEditor from '../../../components/Editor/Link'
import addLinkProtocol from '../../../helpers/addLinkProtocol'

function LinkWrap({ children, href }) {
  const [{ isPreview }] = useContextStore()
  if (isPreview) {
    return <div className='a-link'>{children}</div>
  }
  return <a href={addLinkProtocol(href)}>{children}</a>
}

export default function Contact({
  keyName,
  keyTitle,
  className = 'icon m-1',
  children,
}) {
  const [{ isPreview }] = useContextStore()
  const [keyValue] = useWebBuilderContext(keyName)

  if (!isPreview && !keyValue) {
    return <></>
  }

  return (
    <div className={className}>
      <LinkWrap href={keyValue}>
        <LinkEditor keyName={keyName} keyTitle={keyTitle}>
          {children}
        </LinkEditor>
      </LinkWrap>
    </div>
  )
}
