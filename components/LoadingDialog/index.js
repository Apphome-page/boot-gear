import { useContext } from 'react'
import { Modal, ModalBody, Spinner } from 'react-bootstrap'
import noop from 'lodash/noop'

import { StoreContext } from '../../utils/storeProvider'

function BigSpinner({
  sizing = 128,
  thickness = parseInt(sizing / 16, 10),
  duration = parseInt(thickness / 4, 10),
  direction = 'normal',
}) {
  return (
    <Spinner className='loading-big-spinner'>
      {/* <style jsx>{`
        .loading-big-spinner {
          height: ${sizing}px;
          width: ${sizing}px;
          border-width: ${thickness}px;
          animation-duration: ${duration}s;
          animation-direction: ${direction};
          border-right-color: 'rgba(123, 16, 255, 0.1)';
        }
      `}</style> */}
    </Spinner>
  )
}

export default function Loading() {
  const [{ loadingMutex }] = useContext(StoreContext)
  return (
    <Modal
      centered
      backdrop
      size='sm'
      contentClassName='bg-transparent'
      show={!!loadingMutex}
      onHide={noop}
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
