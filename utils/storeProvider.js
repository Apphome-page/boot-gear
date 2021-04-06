import { createContext, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('../components/Login'), {
  ssr: false,
})
const Loading = dynamic(() => import('../components/LoadingDialog'), {
  ssr: false,
})

export const StoreContext = createContext({})

export default function StoreProvider({ store, children }) {
  const [folioStore, setFolioStore] = useState(
    store || {
      loadingMutex: 0, // Full screen blocking Loader - Please Do not Access Directly.
      signPop: false, // Dismissable Sign-In PopUp
      signForced: false, // Un-dismissable Sign-In PopUp
    }
  )

  const queueLoading = useCallback(() => {
    setFolioStore((prevFolioStore) => ({
      ...prevFolioStore,
      loadingMutex:
        prevFolioStore.loadingMutex < 0 ? 0 : prevFolioStore.loadingMutex + 1,
    }))
  }, [])

  const unqueueLoading = useCallback(() => {
    setFolioStore((prevFolioStore) => ({
      ...prevFolioStore,
      loadingMutex:
        prevFolioStore.loadingMutex < 1 ? 0 : prevFolioStore.loadingMutex - 1,
    }))
  }, [])

  const updateFolioStore = useCallback((deltaStore = {}) => {
    const newDeltaStore = { ...deltaStore }
    delete newDeltaStore.loadingMutex
    setFolioStore((prevStore) => ({ ...prevStore, ...newDeltaStore }))
  }, [])

  return (
    <StoreContext.Provider
      value={[
        { ...folioStore, queueLoading, unqueueLoading },
        updateFolioStore,
      ]}
    >
      {children}
      <Loading />
      <Login />
    </StoreContext.Provider>
  )
}
