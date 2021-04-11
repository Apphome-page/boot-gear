import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'

import EMPTY_PROMISE from '../../utils/emptyPromise'

import LoginContext from './LoginContext'

const LoginElement = dynamic(() => import('./LoginElement'), { ssr: false })

export default function LoginProvider({ children }) {
  const [firebasePromise, setFirebasePromise] = useState(EMPTY_PROMISE)
  const [firebaseApp, setFirebaseApp] = useState(null)
  const [isPop, setPop] = useState(false)
  const [isForced, setForced] = useState()

  const signPop = useCallback(() => {
    setPop(true)
  }, [])

  const signForced = useCallback(() => {
    setForced(true)
  }, [])

  const signClear = useCallback(() => {
    setPop(false)
    setForced(false)
  }, [])

  useEffect(() => {
    setFirebasePromise((prevFirePromise) => {
      if (prevFirePromise !== EMPTY_PROMISE) {
        return prevFirePromise
      }
      return Promise.all([
        import('../../firebase.json'),
        import('firebase/app'),
      ]).then(([firebaseConfig, firebase]) => {
        try {
          firebase.initializeApp(firebaseConfig)
        } catch (error) {
          if (error.code !== 'app/duplicate-app') {
            // TODO: Send to Sentry
            throw error
          }
        }
        setFirebaseApp(firebase)
      })
    })

    return () => {
      setFirebaseApp(null)
    }
  }, [])

  return (
    <LoginContext.Provider
      value={{
        signPop,
        signForced,
        signClear,
        firebasePromise,
        firebaseApp,
      }}
    >
      {children}
      <LoginElement
        isPop={isPop}
        isForced={isForced}
        signClear={signClear}
        firebaseApp={firebaseApp}
      />
    </LoginContext.Provider>
  )
}
