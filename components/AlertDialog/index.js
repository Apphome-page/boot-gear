import { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import classNames from 'classnames'

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
  const setTimeoutRef = useRef(null)

  const clearTimeoutRef = useCallback(() => {
    if (setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current)
      setTimeoutRef.current = null
    }
  }, [])

  const closeActionCb = useCallback(() => {
    clearTimeoutRef()
    setExpired(true)
    modStore(resetAlertProps)
  }, [clearTimeoutRef, modStore])

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
    clearTimeoutRef()
    if (alertTimeout > 0) {
      setTimeoutRef.current = setTimeout(closeActionCb, alertTimeout * 1000)
    }
    return clearTimeoutRef
  }, [alertTimeout, clearTimeoutRef, closeActionCb])

  const basicVariant =
    !alertVariant || alertVariant === resetAlertProps.alertVariant

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
        className={classNames('m-0', {
          'bg-alt': basicVariant,
          'text-white': basicVariant,
        })}
        timeout={alertTimeout}
      >
        {alertText}
      </ModalBody>
    </Modal>
  )
}
