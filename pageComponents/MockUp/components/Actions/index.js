import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Download } from '@emotion-icons/bootstrap/Download'

import Subscription from '../../../../components/Subscription'

import { MockupContext } from '../../helpers/MockProvider'

export default function Actions() {
  const { eventSave } = useContext(MockupContext)
  const [subShow, setSubShow] = useState(false)

  return (
    <>
      <Subscription
        show={subShow}
        onComplete={() => {
          setSubShow(false)
          eventSave()
        }}
      />
      <Button
        variant='light'
        className='w-100 btn-alt d-flex justify-content-center align-items-center'
        onClick={() => {
          setSubShow(true)
        }}
      >
        <span className='mr-1'>Save & Download</span>
        <Download size='18' />
      </Button>
    </>
  )
}
