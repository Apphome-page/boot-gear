import { useState, useContext, useEffect } from 'react'

import { StoreContext } from './storeProvider'

export default function useUserData() {
  const [userData, setUserData] = useState({})
  const [{ firebase, userAuth }] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    const userDataRef = firebase.database().ref(`users/${userId}`)

    userDataRef.on('value', (snapshot) => {
      setUserData(snapshot.val())
    })

    return () => {
      userDataRef.off()
    }
  }, [firebase, userId])

  return userData
}
