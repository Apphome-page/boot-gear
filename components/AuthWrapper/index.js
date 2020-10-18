import { useContext, useEffect } from 'react'

import { StoreContext } from '../../utils/storeProvider'

export default function AuthWrapper({ children }) {
  const [{ userAuth }, modStore] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    modStore({
      signForced: true,
    })
    return () => {
      modStore({
        signForced: false,
      })
    }
  }, [modStore])

  if (userId) {
    return children
  }
  return <></>
}
