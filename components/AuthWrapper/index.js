import { useEffect } from 'react'

import { useLoading } from '../LoadingPop'
import {
  useLogin,
  useFirebaseApp,
  useFirebaseStatus,
  useUserAuth,
} from '../LoginPop'

export default function AuthWrapper({ children, placeholder }) {
  const { signForced, signClear } = useLogin()
  const { queueLoading, unqueueLoading, clearLoading } = useLoading()

  const firebaseApp = useFirebaseApp()
  const { firebaseLaunch } = useFirebaseStatus()
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
