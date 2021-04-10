import { createContext, useState, useContext, useCallback } from 'react'
import dynamic from 'next/dynamic'

const LoadingElement = dynamic(() => import('./LoadingElement'), { ssr: false })

const LoadingContext = createContext()

export default function LoadingProvider({ children }) {
  const [loadingMutex, setLoadingMutex] = useState(0)

  const queueLoading = useCallback(() => {
    setLoadingMutex((prevLoadingMutex) =>
      prevLoadingMutex < 0 ? 0 : prevLoadingMutex + 1
    )
  }, [])

  const unqueueLoading = useCallback(() => {
    setLoadingMutex((prevLoadingMutex) =>
      prevLoadingMutex < 1 ? 0 : prevLoadingMutex - 1
    )
  }, [])

  const clearLoading = useCallback(() => {
    setLoadingMutex(0)
  }, [])

  return (
    <LoadingContext.Provider
      value={{ queueLoading, unqueueLoading, clearLoading }}
    >
      {children}
      <LoadingElement loadingMutex={loadingMutex} />
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const loadingContext = useContext(LoadingContext) || {}
  return loadingContext
}
