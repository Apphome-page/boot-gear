import { memo, createContext, useContext, useMemo, useReducer } from 'react'

import Element from './Element'

const LoadingElement = memo(Element)

const LoadingContext = createContext()

const loadingReducer = (mutex, action) => {
  let updatedMutex = mutex
  switch (action) {
    case 'queue':
      updatedMutex = mutex < 0 ? 0 : mutex + 1
      break
    case 'unqueue':
      updatedMutex = mutex < 1 ? 0 : mutex - 1
      break
    case 'clear':
      updatedMutex = 0
      break
    default:
      updatedMutex = mutex
      break
  }
  return updatedMutex
}

export default function LoadingProvider({ children }) {
  const [loadingMutex, dispatchMutex] = useReducer(loadingReducer, 0)

  return (
    <>
      <LoadingContext.Provider value={dispatchMutex}>
        {children}
      </LoadingContext.Provider>
      <LoadingElement loadingMutex={loadingMutex} />
    </>
  )
}

export const useLoading = () => {
  const dispatchMutex = useContext(LoadingContext)
  const loadingActions = useMemo(
    () =>
      Object.freeze({
        queueLoading: () => dispatchMutex('queue'),
        unqueueLoading: () => dispatchMutex('unqueue'),
        clearLoading: () => dispatchMutex('clear'),
      }),
    [dispatchMutex]
  )
  return loadingActions
}
