import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../../Editor/Text'

export default function Address() {
  const [appAddressValue, setAppAddress] = useWebBuilderContext('appAddress')
  return (
    <div className='col-lg-3 my-1 py-1'>
      <h3>Address</h3>
      <TextEditor
        id='container-appAddress'
        initText={appAddressValue}
        onChange={(text) => {
          setAppAddress(text)
        }}
      />
    </div>
  )
}
