import { createContext, useState, useCallback } from 'react'

export const StoreContext = createContext({})

export default function StoreProvider({ store, children }) {
  const [webStore, setwebStore] = useState(store || {})
  const updatewebStore = useCallback((deltaStore) => {
    setwebStore((prevStore) => ({ ...prevStore, ...deltaStore }))
  }, [])
  return (
    <StoreContext.Provider value={[webStore, updatewebStore]}>
      {children}
    </StoreContext.Provider>
  )
}
