import { useCallback, useMemo, useEffect, useRef } from 'react'

import IconClose from '@svg-icons/bootstrap/x-circle.svg'

import styles from './styles.module.scss'

export default function AlertElement({
  id,
  children,
  variant,
  dismiss,
  timeout,
  callback,
}) {
  const alertTimeoutRef = useRef(null)

  const timeoutMs = timeout * 1000
  const timeoutDelay = useMemo(() => 0 * id + Math.random().toFixed(2), [id])

  const closeAlert = useCallback(() => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current)
      alertTimeoutRef.current = null
    }
    callback(id)
  }, [callback, id])

  useEffect(() => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current)
      alertTimeoutRef.current = null
    }
    if (dismiss) {
      alertTimeoutRef.current = setTimeout(() => {
        callback(id)
      }, timeoutMs)
    }

    return closeAlert
  }, [timeoutMs, dismiss, callback, id, closeAlert])

  return (
    <div
      className={styles[`alert-${variant}`]}
      style={{
        '--timeout-delay': `${timeoutDelay}s`,
        '--timeout': `${timeoutMs}s`,
      }}
    >
      {children}
      <IconClose
        className={styles.alertClose}
        height='16'
        width='16'
        onClick={closeAlert}
      />
    </div>
  )
}
