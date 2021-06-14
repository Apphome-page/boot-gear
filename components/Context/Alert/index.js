import { memo, createContext, useCallback, useContext, useReducer } from 'react'

import Element from './Element'

import uuid from '../../../utils/uuid'

import styles from './styles.module.scss'

const AlertContext = createContext()

const AlertElement = memo(Element)

const alertReducer = (alerts, { type, id, content, ...restOptions } = {}) => {
  let updatedAlerts = []
  const expiredAlert = alerts.find(({ id: prevId }) => prevId === id)
  switch (type) {
    case 'add':
      updatedAlerts = [
        ...alerts,
        { id: uuid('alert'), content, ...restOptions },
      ]
      break
    case 'remove':
      if (expiredAlert) {
        updatedAlerts = alerts.filter(({ id: prevId }) => prevId !== id)
        if (expiredAlert.callback) {
          expiredAlert.callback(id)
        }
      }
      break
    case 'clear':
      updatedAlerts = []
      break
    default:
      updatedAlerts = alerts
      break
  }
  return updatedAlerts
}

export default function AlertProvider({
  variant: globalVariant = 'info',
  autoDismiss: globalAutoDismiss = true,
  autoDismissTimeout: globalAutoDismissTimeout = 6,
  children,
}) {
  const [alerts, dispatchAlert] = useReducer(alertReducer, [])

  const removeCallback = useCallback((id) => {
    dispatchAlert({ type: 'remove', id })
  }, [])

  return (
    <>
      <AlertContext.Provider value={dispatchAlert}>
        {children}
      </AlertContext.Provider>
      <aside className={styles.alertContainer}>
        {alerts.map(
          ({
            id,
            content,
            variant = globalVariant,
            autoDismiss = globalAutoDismiss,
            autoDismissTimeout = globalAutoDismissTimeout,
          }) => (
            <AlertElement
              key={id}
              id={id}
              variant={variant}
              dismiss={autoDismiss}
              timeout={autoDismissTimeout}
              callback={removeCallback}
            >
              {content}
            </AlertElement>
          )
        )}
      </aside>
    </>
  )
}

export const useAlerts = () => {
  const dispatchAlert = useContext(AlertContext)
  const addAlert = useCallback(
    (content, data) => dispatchAlert({ ...data, content, type: 'add' }),
    [dispatchAlert]
  )
  const clearAlerts = useCallback(() => dispatchAlert({ type: 'clear' }), [
    dispatchAlert,
  ])
  return {
    addAlert,
    clearAlerts,
  }
}
