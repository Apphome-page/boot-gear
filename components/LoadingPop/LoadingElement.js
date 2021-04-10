import { Modal, ModalBody, Spinner } from 'react-bootstrap'
import noop from 'lodash/noop'

export default function Loading({ loadingMutex }) {
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
        <Spinner
          variant='warning'
          animation='border'
          role='status'
          style={{
            height: '256px',
            width: '256px',
            borderWidth: '16px',
            animationDuration: '4s',
            borderRightColor: 'rgba(123, 16, 255, 0.1)',
          }}
        />
        <Spinner
          className='position-absolute'
          variant='success'
          animation='border'
          role='status'
          style={{
            height: '128px',
            width: '128px',
            borderWidth: '8px',
            animationDuration: '2s',
            animationDirection: 'reverse',
            borderRightColor: 'rgba(123, 16, 255, 0.1)',
          }}
        />
        <Spinner
          className='position-absolute'
          variant='info'
          animation='border'
          role='status'
          style={{
            height: '64px',
            width: '64px',
            borderWidth: '4px',
            animationDuration: '1s',
            borderRightColor: 'rgba(123, 16, 255, 0.1)',
          }}
        />
      </ModalBody>
    </Modal>
  )
}
