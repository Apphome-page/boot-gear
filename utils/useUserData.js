import { useState, useContext, useEffect } from 'react'

import getPlanDetails from './getPlanDetails'

import { StoreContext } from './storeProvider'

export default function useUserData() {
  const [userData, setUserData] = useState({})
  const [{ firebase, userAuth }] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    const userDataRef = firebase.database().ref(`users/${userId}`)
    userDataRef.on('value', (snapshot) => {
      const snapVal = snapshot.val()
      snapVal.plan = getPlanDetails(snapVal.plan_id)
      setUserData(snapVal)
    })
    return () => {
      userDataRef.off()
    }
  }, [firebase, userId])

  return userData
}
