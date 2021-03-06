import { createContext, useState, useContext, useCallback } from 'react'
import noop from 'lodash/noop'

import AlertContainer from './AlertContainer'
import AlertElement from './AlertElement'

import uuid from '../../utils/uuid'

const AlertContext = createContext()

export default function AlertProvider({
  variant: globalVariant = 'info',
  autoDismiss: globalAutoDismiss = true,
  autoDismissTimeout: globalAutoDismissTimeout = 6,
  callback: globalCallback = noop,
  children,
}) {
  const [alerts, setAlerts] = useState([])

  const add = useCallback((content, options = {}) => {
    setAlerts((prevAlerts) => {
      const newAlert = { id: uuid('alert'), content, ...options }
      return [...prevAlerts, newAlert]
    })
  }, [])

  const remove = useCallback(
    (id) => {
      if (!id) {
        return
      }
      setAlerts((prevAlerts) => {
        const expiredAlert = prevAlerts.find(({ id: prevId }) => prevId === id)
        if (!expiredAlert) {
          return prevAlerts
        }
        ;(expiredAlert.callback || globalCallback || noop)(id)
        return prevAlerts.filter(({ id: prevId }) => prevId !== id)
      })
    },
    [globalCallback]
  )

  const clear = useCallback(() => {
    setAlerts([])
  }, [])

  return (
    <AlertContext.Provider
      value={{ add, clear, alerts: Object.freeze(alerts) }}
    >
      {children}
      {/*
       * TODO: Put Alerts on body portal
       * TODO: Style using styled-jsx
       */}
      <AlertContainer>
        {alerts.map(
          ({
            id,
            variant = globalVariant,
            autoDismiss = globalAutoDismiss,
            autoDismissTimeout = globalAutoDismissTimeout,
            content,
          }) => (
            <AlertElement
              key={id}
              id={id}
              variant={variant}
              dismiss={autoDismiss}
              timeout={autoDismissTimeout}
              callback={remove}
            >
              {content}
            </AlertElement>
          )
        )}
      </AlertContainer>
    </AlertContext.Provider>
  )
}

export const useAlerts = () => {
  const { add = noop, clear = noop, alerts = [] } =
    useContext(AlertContext) || {}
  return {
    addAlert: add,
    clearAlerts: clear,
    AlertStack: alerts,
  }
}
