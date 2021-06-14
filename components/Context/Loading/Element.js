import { Modal, ModalBody, Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import noop from 'lodash/noop'

import styles from './styles.module.scss'

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
      <ModalBody
        className={classNames(
          'position-relative',
          'd-flex',
          'justify-content-center',
          'align-items-center'
        )}
      >
        <Spinner
          variant='warning'
          animation='border'
          role='status'
          className={styles.bigSpin}
        />
        <Spinner
          className={classNames('position-absolute', styles.midSpin)}
          variant='success'
          animation='border'
          role='status'
        />
        <Spinner
          className={classNames('position-absolute', styles.smallSpin)}
          variant='info'
          animation='border'
          role='status'
        />
      </ModalBody>
    </Modal>
  )
}
