import { useContext } from 'react'
import { Col, Button } from 'react-bootstrap'

import { MockupContext } from '../../helpers/MockProvider'

export default function Actions() {
  const { eventReset, eventSave } = useContext(MockupContext)

  return (
    <>
      <Col>
        <Button variant='info' className='col' onClick={eventReset}>
          Reset
        </Button>
      </Col>
      <Col>
        <Button variant='success' className='col' onClick={eventSave}>
          Save
        </Button>
      </Col>
    </>
  )
}
