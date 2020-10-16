import { createContext, useState, useCallback } from 'react'

export const StoreContext = createContext({})

export default function StoreProvider({ store, children }) {
  const { firebase } = store || {}
  const [folioStore, setFolioStore] = useState(store || {})
  const updateFolioStore = useCallback(
    (deltaStore) => {
      setFolioStore((prevStore) => ({ ...prevStore, ...deltaStore, firebase }))
    },
    [firebase]
  )
  return (
    <StoreContext.Provider value={[{ ...folioStore }, updateFolioStore]}>
      {children}
    </StoreContext.Provider>
  )
}
