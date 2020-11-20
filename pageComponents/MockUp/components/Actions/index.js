import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Download } from '@emotion-icons/bootstrap/Download'

import { MockupContext } from '../../helpers/MockProvider'

export default function Actions() {
  const { eventSave } = useContext(MockupContext)

  return (
    <Button
      variant='light'
      className='w-100 btn-alt d-flex justify-content-center align-items-center'
      onClick={eventSave}
    >
      <span className='mr-1'>Save & Download</span>
      <Download size='18' />
    </Button>
  )
}
