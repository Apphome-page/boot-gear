import { useCallback } from 'react'
import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import ImageEditor from '../../../Editor/Image'

export default function Banner() {
  const [appScreenshotValue, updateAppScreenshot] = useWebBuilderContext(
    'appScreenshot'
  )
  const onChange = useCallback((uri) => updateAppScreenshot(uri), [
    updateAppScreenshot,
  ])

  return (
    <ImageEditor
      id='container-appScreenshot'
      defaultValue={appScreenshotValue}
      onChange={onChange}
      alt=''
      className='w-100'
    />
  )
}
