import { createContext, useState } from 'react'

export const StoreContext = createContext({})

export default function StoreProvider({ store, children }) {
  const [folioStore, setFolioStore] = useState(store || {})
  const updateFolioStore = (deltaStore) => {
    if (typeof deltaStore === 'function') {
      setFolioStore(deltaStore)
    } else {
      setFolioStore((prevStore) => ({ ...prevStore, ...deltaStore }))
    }
  }
  return (
    <StoreContext.Provider value={[folioStore, updateFolioStore]}>
      {children}
    </StoreContext.Provider>
  )
}
