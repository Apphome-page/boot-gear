import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../../Editor/Text'

export default function About() {
  const [appAboutValue, setAppAbout] = useWebBuilderContext('appAbout')
  return (
    <div className='col-lg-6 my-1 py-1'>
      <h3>About Us</h3>
      <TextEditor
        id='container-appAbout'
        initText={appAboutValue}
        onChange={(text) => {
          setAppAbout(text)
        }}
      />
    </div>
  )
}
