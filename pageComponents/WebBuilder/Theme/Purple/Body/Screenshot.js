import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import ImageEditor from '../../../components/Editor/Image'
import TextEditor from '../../../components/Editor/Text'

export default function Screenshot({ keyName, keyCaptionName, isAlternate }) {
  const [{ isPreview }] = useContextStore()
  const [appKeyValue] = useWebBuilderContext(keyName)
  const [appKeyCaptionValue] = useWebBuilderContext(keyCaptionName)
  if (!isPreview && !appKeyValue && !appKeyCaptionValue) {
    return <></>
  }
  return (
    <div className='row my-5'>
      {isAlternate ? (
        <div className='col-lg-6 p-3'>
          <TextEditor keyName={keyCaptionName} />
        </div>
      ) : (
        <></>
      )}
      <div className='col-lg-6 p-3'>
        <ImageEditor
          keyName={keyName}
          alt=''
          className='w-100 h-100 shadow-lg'
        />
      </div>
      {!isAlternate ? (
        <div className='col-lg-6 p-3'>
          <TextEditor keyName={keyCaptionName} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
