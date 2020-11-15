import { useState, useCallback, createContext } from 'react'

import frameTemplates from '../templates'

import { defaultProps as frameDefaultProps } from './defaults'

const maxHeight = 512

export const MockupContext = createContext(null)

export default function MockProvider({ children }) {
  const [currentMockUp, setCurrentMockUp] = useState(0)
  const [mockStore, setMockStore] = useState([frameDefaultProps(maxHeight)])
  const addMockStore = useCallback(() => {
    setMockStore((prevStore) => [
      ...prevStore,
      {
        ...frameDefaultProps(maxHeight),
        backgroundColor: `#${Math.random().toFixed(2) * 100}${
          Math.random().toFixed(2) * 100
        }${Math.random().toFixed(2) * 100}`,
      },
    ])
  }, [])
  const removeMockStore = useCallback((mockIdx) => {
    setMockStore((prevStore) => {
      const newMockStore = [...prevStore]
      if (prevStore.length > 1) {
        newMockStore.splice(mockIdx, 1)
        setCurrentMockUp((prevCurrentMockUp) => {
          if (mockIdx <= prevCurrentMockUp && prevCurrentMockUp !== 0) {
            return prevCurrentMockUp - 1
          }
          return prevCurrentMockUp
        })
      }
      return newMockStore
    })
  }, [])
  const modMockStore = useCallback(
    (deltaStore) => {
      setMockStore((prevStore) => {
        const newStore = [...prevStore]
        const newCurrentStore = { ...newStore[currentMockUp], ...deltaStore }
        newStore[currentMockUp] = frameTemplates[
          newCurrentStore.template
        ].adjustProps(newCurrentStore)
        return newStore
      })
    },
    [currentMockUp]
  )
  return (
    <MockupContext.Provider
      value={{
        data: mockStore,
        current: currentMockUp,
        add: addMockStore,
        remove: removeMockStore,
        modCurrent: modMockStore,
        setCurrent: setCurrentMockUp,
      }}
    >
      {children}
    </MockupContext.Provider>
  )
}
