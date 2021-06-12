import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../components/Editor/Text'

import styles from './styles.module.scss'

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
          'd-inline-block h1 font-weight-lighter',
          styles.count
        )}
      >
        <TextEditor keyName={keyName} buttons={[]} />
      </div>
      <div className='ml-1 d-inline-block lead'>
        {keyName === 'appMetricDownloads' ? 'Downloads' : 'Rating'}
      </div>
    </>
  )
}
