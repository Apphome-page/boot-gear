import { useState, useContext, useEffect } from 'react'

import LoginContext from './LoginContext'

import EMPTY_PROMISE from '../../utils/emptyPromise'

export default function useFireService(service) {
  const { firebasePromise, firebaseApp } = useContext(LoginContext) || {}

  const [firstLaunch, setFirstLaunch] = useState(false)
  const [firstPromise, setFirstPromise] = useState(EMPTY_PROMISE)
  const [firebaseService, setFirebaseService] = useState(null)

  useEffect(() => {
    setFirstPromise((prevFirstPromise) => {
      if (prevFirstPromise !== EMPTY_PROMISE) {
        return prevFirstPromise
      }
      return firebasePromise
        .then(() => import(`firebase/${service}`))
        .then(() => {
          setFirstLaunch(true)
          setFirebaseService(firebaseApp[service]())
        })
    })

    return () => {
      setFirebaseService(null)
    }
  }, [firebaseApp, firebasePromise, service])

  return {
    firstLaunch,
    firstPromise,
    data: firebaseService,
  }
}
