import { useEffect } from 'react'

import { useLoading } from '../LoadingPop'

import useLogin from '../LoginPop/useLogin'
import useUser from '../LoginPop/useUser'

export default function AuthWrapper({ children, placeholder }) {
  const { queueLoading, unqueueLoading } = useLoading()

  const { signForced, signClear } = useLogin()
  const { firstLaunch, firstPromise, data: userAuth } = useUser()

  useEffect(() => {
    Promise.all([
      // Show Loader
      queueLoading(),
      // Wait for UserData
      firstPromise,
    ]).then(() => {
      // Hide Loader
      unqueueLoading()
      // If user is not logged in, force sign-in
      if (!userAuth || !userAuth.uid) {
        signForced()
      }
    })
    return () => {
      // Close up
      signClear()
    }
  }, [
    firstPromise,
    userAuth,
    queueLoading,
    unqueueLoading,
    signForced,
    signClear,
  ])

  if (firstLaunch && userAuth && userAuth.uid) {
    return children
  }
  return placeholder || <></>
}
