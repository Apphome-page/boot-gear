import { useEffect } from 'react'

import { useLoading } from '../Context/Loading'
import { useLogin, useFirebase, useUserAuth } from '../Context/Login'

export default function AuthWrapper({ children, placeholder }) {
  const { queueLoading, unqueueLoading, clearLoading } = useLoading()

  const { signForced, signClear } = useLogin()
  const { firebaseApp, firebaseLaunch } = useFirebase()
  const userAuth = useUserAuth()

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    if (firebaseLaunch) {
      unqueueLoading()
      if (userId) {
        signClear()
      } else {
        signForced()
      }
    } else if (!userId) {
      queueLoading()
    }
    return () => {
      signClear()
      clearLoading()
    }
  }, [
    clearLoading,
    firebaseLaunch,
    queueLoading,
    signClear,
    signForced,
    unqueueLoading,
    userId,
  ])

  if (firebaseApp && userId) {
    return children
  }
  return placeholder || <></>
}
