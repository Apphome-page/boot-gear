import { useState, useEffect, useCallback, useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

import { AlertBody } from './style'

export const resetAlertProps = {
  alertVariant: 'default',
  alertTimeout: 0,
  alertText: '',
}

export default function AlertDialog() {
  const [{ alertTimeout, alertText, alertVariant }, modStore] = useContext(
    StoreContext
  )
  const [expired, setExpired] = useState(alertTimeout === 0)
  const [, setTimeoutRef] = useState(null)

  const closeActionCb = useCallback(() => {
    setExpired(true)
    modStore(resetAlertProps)
  }, [modStore])

  useEffect(() => {
    const isAlertReset =
      alertTimeout === resetAlertProps.alertTimeout &&
      alertVariant === resetAlertProps.alertVariant &&
      alertText === resetAlertProps.alertText
    // If Reset conditions are not met, Un-expire Alert for new data
    if (!isAlertReset) {
      setExpired(false)
    }
  }, [alertTimeout, alertVariant, alertText, modStore])

  useEffect(() => {
    setTimeoutRef((prevTimeoutRef) => {
      if (prevTimeoutRef) {
        clearTimeout(prevTimeoutRef)
      }
      if (alertTimeout > 0) {
        return setTimeout(closeActionCb, alertTimeout * 1000)
      }
      return null
    })
    return () => {
      setTimeoutRef((prevTimeoutRef) => {
        if (prevTimeoutRef) {
          clearTimeout(prevTimeoutRef)
        }
        return null
      })
    }
  }, [alertTimeout, closeActionCb])

  return (
    <Modal
      backdrop
      size='lg'
      contentClassName='shadow-lg'
      show={!expired}
      onHide={() => {}}
    >
      <ModalBody
        dismissible
        as={AlertBody}
        onClose={closeActionCb}
        variant={alertVariant}
        className={`m-0${alertVariant ? '' : ' bg-alt text-white'}`}
        timeout={alertTimeout}
      >
        {alertText}
      </ModalBody>
    </Modal>
  )
}
