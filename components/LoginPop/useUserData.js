import { useState, useContext, useCallback, useEffect } from 'react'

import LoginContext from './LoginContext'
import useUser from './useUser'

import EMPTY_PROMISE from '../../utils/emptyPromise'

import getPlanDetails from '../../utils/getPlanDetails'

export default function useUserData(refKey = '', { once = false } = {}) {
  const { firebasePromise, firebaseApp } = useContext(LoginContext) || {}
  const { firstPromise: userFirstPromise, data: userAuth } = useUser()

  const [firstLaunch, setFirstLaunch] = useState(false)
  const [firstPromise, setFirstPromise] = useState(EMPTY_PROMISE)
  const [userData, setUserData] = useState(null)

  const snapValue = useCallback(
    (snapshot) => {
      const snapVal = snapshot.val()
      if (snapVal && !refKey) {
        // Add plan details into root request
        snapVal.plan = getPlanDetails(snapVal.plan_id)
      }
      setUserData(snapVal)
    },
    [refKey]
  )

  useEffect(() => {
    let userDataRef = null
    setFirstPromise((prevFirstPromise) => {
      if (prevFirstPromise !== EMPTY_PROMISE) {
        return prevFirstPromise
      }
      return firebasePromise
        .then(() => userFirstPromise)
        .then(() => import('firebase/database'))
        .then(() => {
          if (firebaseApp) {
            userDataRef = firebaseApp
              .database()
              .ref(`users/${userAuth.uid}${refKey ? `/${refKey}` : ''}`)
            if (once) {
              userDataRef.once('value').then(snapValue)
            } else {
              userDataRef.on('value', snapValue)
            }
            setFirstLaunch(true)
          }
        })
    })

    return () => {
      if (userDataRef) {
        userDataRef.off('value', snapValue)
      }
    }
  }, [
    firebaseApp,
    firebasePromise,
    once,
    refKey,
    snapValue,
    userAuth.uid,
    userFirstPromise,
  ])

  return {
    firstLaunch,
    firstPromise,
    data: userData,
  }
}
