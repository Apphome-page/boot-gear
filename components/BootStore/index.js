import { createContext, useState, useCallback, useContext } from 'react'

export const BootContext = createContext({})

export default function BootStore({ store, children }) {
  const [bootStore, setBootStore] = useState(store || {})
  const updateBootStore = useCallback((deltaStore = {}) => {
    setBootStore((prevStore) => ({ ...prevStore, ...deltaStore }))
  }, [])

  return (
    <BootContext.Provider value={[{ ...bootStore }, updateBootStore]}>
      {children}
    </BootContext.Provider>
  )
}

export const useBootStore = () => {
  const BootCtx = useContext(BootContext) || {}
  return BootCtx
}
