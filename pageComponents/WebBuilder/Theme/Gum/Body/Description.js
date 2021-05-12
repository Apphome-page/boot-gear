import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../../Editor/Text'

export default function Description() {
  const [appDescriptionValue, setAppDescription] = useWebBuilderContext(
    'appDescription'
  )
  return (
    <div className='p-1 rounded bg-white lead font-weight-normal text-justify text-muted text-break'>
      <TextEditor
        id='container-appDescription'
        initValue={appDescriptionValue}
        onChange={(text) => {
          setAppDescription(text)
        }}
      />
    </div>
  )
}
