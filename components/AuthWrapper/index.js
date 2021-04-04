import { useMemo, useContext, useEffect } from 'react'
import { useUser } from 'reactfire'

import { StoreContext } from '../../utils/storeProvider'

export default function AuthWrapper({ children, placeholder }) {
  const [, modStore] = useContext(StoreContext)

  const { data: userData, hasEmitted: firstLaunch } = useUser()

  const userId = useMemo(() => userData && userData.uid, [userData])

  useEffect(() => {
    if (!firstLaunch || !userId) {
      modStore({
        signForced: true,
      })
    }
    return () => {
      modStore({
        signForced: false,
      })
    }
  }, [firstLaunch, modStore, userId])

  if (firstLaunch && userId) {
    return children
  }
  return placeholder || <></>
}
