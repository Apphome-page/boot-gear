import { useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

import { BigSpinner } from './style'

export default function Loading() {
  const [{ loadingPop }] = useContext(StoreContext)
  return (
    <Modal
      centered
      backdrop
      size='sm'
      contentClassName='bg-transparent'
      show={loadingPop}
      onHide={() => {}}
    >
      <ModalBody className='position-relative d-flex justify-content-center align-items-center'>
        <BigSpinner
          variant='warning'
          animation='border'
          role='status'
          sizing='256'
        />
        <BigSpinner
          className='position-absolute'
          variant='success'
          animation='border'
          role='status'
          sizing='128'
          direction='reverse'
        />
        <BigSpinner
          className='position-absolute'
          variant='info'
          animation='border'
          role='status'
          sizing='64'
        />
      </ModalBody>
    </Modal>
  )
}
