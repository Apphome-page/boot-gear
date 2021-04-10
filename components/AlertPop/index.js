import { createContext, useState, useContext, useCallback } from 'react'
import uniqueId from 'lodash/uniqueId'
import noop from 'lodash/noop'

import AlertContainer from './AlertContainer'
import AlertElement from './AlertElement'

const AlertContext = createContext()

export default function AlertProvider({
  variant: globalVariant = 'info',
  autoDismiss: globalAutoDismiss = true,
  autoDismissTimeout: globalAutoDismissTimeout = 500,
  callback: globalCallback = noop,
  children,
}) {
  const [alerts, setAlerts] = useState([])

  const add = useCallback((content, options = {}) => {
    setAlerts((prevAlerts) => {
      const newAlert = { id: uniqueId('alert-'), content, ...options }
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
          ({ id, variant, autoDismiss, autoDismissTimeout, content }) => (
            <AlertElement
              key={id}
              id={id}
              variant={variant || globalVariant}
              dismiss={autoDismiss || globalAutoDismiss}
              timeout={autoDismissTimeout || globalAutoDismissTimeout}
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
  const { add, clear, alerts } = useContext(AlertContext)
  return {
    addAlert: add,
    clearAlerts: clear,
    AlertStack: alerts,
  }
}
