import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../../Editor/Text'

export default function Title() {
  const [appTitleValue, setAppTitle] = useWebBuilderContext('appTitle')
  const [appNameValue] = useWebBuilderContext('appName')
  return (
    <h1>
      <TextEditor
        id='container-appTitle'
        initValue={appTitleValue || appNameValue || ''}
        onChange={(text) => {
          setAppTitle(text)
        }}
      />
    </h1>
  )
}
