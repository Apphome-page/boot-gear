import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import ImageEditor from '../../../components/Editor/Image'
import TextEditor from '../../../components/Editor/Text'

export default function Screenshot({
  keyName,
  keyCaptionName,
  placeholderImage,
  isAlternate,
}) {
  const [{ isPreview }] = useContextStore()
  const [appKeyValue] = useWebBuilderContext(keyName)
  const [appKeyCaptionValue] = useWebBuilderContext(keyCaptionName)
  if (!isPreview && !appKeyValue && !appKeyCaptionValue) {
    return <></>
  }
  return (
    <div
      className={classNames('my-5', 'row', {
        'flex-row-reverse': isAlternate,
      })}
    >
      <div className='col-lg-6 p-3 text-center screenshot-image'>
        <ImageEditor
          keyName={keyName}
          alt=''
          className='mw-100 mh-100 shadow-lg'
          placeholderImage={placeholderImage}
        />
      </div>
      <div className='col-lg-6 p-3 screenshot-caption'>
        <TextEditor
          keyName={keyCaptionName}
          placeholderText='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        />
      </div>
    </div>
  )
}