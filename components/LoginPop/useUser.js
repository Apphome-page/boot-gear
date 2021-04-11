import { useState, useContext, useEffect } from 'react'

import LoginContext from './LoginContext'
import authSentryAction from './authSentryAction'

import EMPTY_PROMISE from '../../utils/emptyPromise'

export default function useUser() {
  const { firebasePromise, firebaseApp } = useContext(LoginContext) || {}

  const [firstLaunch, setFirstLaunch] = useState(false)
  const [firstPromise, setFirstPromise] = useState(EMPTY_PROMISE)
  const [firebaseUser, setFirebaseUser] = useState(null)

  useEffect(() => {
    let firebaseListener = () => {}
    setFirstPromise(
      firebasePromise
        .then(() => import('firebase/auth'))
        .then(() => {
          if (firebaseApp) {
            firebaseListener = firebaseApp
              .auth()
              .onAuthStateChanged((authState) => {
                authSentryAction(authState)
                setFirebaseUser(authState)
                setFirstLaunch(true)
              })
          }
        })
    )

    return () => {
      firebaseListener()
      setFirebaseUser(null)
    }
  }, [firebaseApp, firebasePromise])

  return {
    firstLaunch,
    firstPromise,
    data: firebaseUser,
  }
}
