import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../components/Editor/Text'

export default function Stats({ keyName }) {
  const [{ isPreview }] = useContextStore()
  const [appValue] = useWebBuilderContext(keyName)

  if (!isPreview && !appValue) {
    return <></>
  }

  return (
    <>
      <div className='count d-inline-block h1 font-weight-lighter'>
        <TextEditor keyName={keyName} buttons={[]} />
      </div>
      <div className='ml-1 d-inline-block lead'>
        {keyName === 'appMetricDownloads' ? 'Downloads' : 'Rating'}
      </div>
    </>
  )
}
