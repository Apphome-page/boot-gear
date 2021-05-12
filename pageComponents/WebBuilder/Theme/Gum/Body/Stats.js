import { useCallback } from 'react'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../Editor/Text'

export default function Stats({ keyName }) {
  const [{ isPreview }] = useContextStore()
  const [appValue, setAppValue] = useWebBuilderContext(keyName)
  const updateCallback = useCallback(
    (text) => {
      setAppValue(text)
    },
    [setAppValue]
  )

  if (!isPreview && !appValue) {
    return <></>
  }

  return (
    <>
      <div className='count d-inline-block h1 font-weight-lighter'>
        <TextEditor
          id={`container-${keyName}`}
          buttons={[]}
          initValue={appValue}
          onChange={updateCallback}
        />
      </div>
      <div className='ml-1 d-inline-block lead'>
        {keyName === 'appDownloads' ? 'Downloads' : 'Rating'}
      </div>
    </>
  )
}
