import { createContext, useState, useCallback } from 'react'

export const StoreContext = createContext({})

export default function StoreProvider({ store, children }) {
  const [folioStore, setFolioStore] = useState(
    store || {
      alertTimeout: 0, // Alert Popup timeout - Reset Condition
      alertText: '', // Alert Text - Reset Condition
      alertVariant: 'default', // Alert Variant - Reset Condition,
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
    </StoreContext.Provider>
  )
}
