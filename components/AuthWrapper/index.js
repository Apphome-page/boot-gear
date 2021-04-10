import { useMemo, useEffect } from 'react'
import { useUser } from 'reactfire'

import { useLogin } from '../LoginPop'

export default function AuthWrapper({ children, placeholder }) {
  const { signForced, signClear } = useLogin()

  const { data: userData, hasEmitted: firstLaunch } = useUser()

  const userId = useMemo(() => userData && userData.uid, [userData])

  useEffect(() => {
    if (!firstLaunch || !userId) {
      signForced()
    }
    return () => {
      signClear()
    }
  }, [firstLaunch, userId, signClear, signForced])

  if (firstLaunch && userId) {
    return children
  }
  return placeholder || <></>
}
