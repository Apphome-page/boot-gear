import { useReducer, useContext, createContext } from 'react'

const Context = createContext()

export default function ContextStore({ value, children }) {
  const [state, updateState] = useReducer(
    (prevState, deltaState) => ({ ...prevState, ...deltaState }),
    value
  )
  return (
    <Context.Provider value={[state, updateState]}>{children}</Context.Provider>
  )
}

export function useContextStore() {
  const contextStore = useContext(Context)
  return contextStore
}
