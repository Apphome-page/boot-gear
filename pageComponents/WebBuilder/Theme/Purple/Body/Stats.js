import classNames from 'classnames'
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
      <div
        className={classNames(
          'd-inline-block',
          'h1',
          'm-0',
          'p-0',
          'font-weight-lighter',
          'statColor'
        )}
      >
        <TextEditor keyName={keyName} buttons={[]} placeholderText='00' />
      </div>
      <div className='ml-1 d-inline-block lead'>
        {keyName === 'appMetricDownloads' ? 'Downloads' : 'Rating'}
      </div>
    </>
  )
}
