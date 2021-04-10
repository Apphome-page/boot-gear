import { useMemo, useEffect } from 'react'

import { useLogin, useFirebaseApp } from '../LoginPop'

export default function AuthWrapper({ children, placeholder }) {
  const { signForced, signClear } = useLogin()

  const firebaseApp = useFirebaseApp()

  const userId = useMemo(
    () =>
      firebaseApp &&
      firebaseApp.auth().currentUser &&
      firebaseApp.auth().currentUser.uid,
    [firebaseApp]
  )

  useEffect(() => {
    if (!firebaseApp || !userId) {
      signForced()
    }
    return () => {
      signClear()
    }
  }, [userId, signClear, signForced, firebaseApp])

  if (firebaseApp && userId) {
    return children
  }
  return placeholder || <></>
}
