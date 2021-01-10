import { useState, useContext, useEffect } from 'react'

import getPlanDetails from './getPlanDetails'

import { StoreContext } from './storeProvider'

export default function useUserData(refKey = '') {
  const [userData, setUserData] = useState({})
  const [{ firebase, userAuth }] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    const userDataRef = firebase
      .database()
      .ref(`users/${userId}${refKey ? `/${refKey}` : ''}`)
    userDataRef.on('value', (snapshot) => {
      const snapVal = snapshot.val()
      if (snapVal && !refKey) {
        // Add plan details into root request
        snapVal.plan = getPlanDetails(snapVal.plan_id)
      }
      setUserData(snapVal)
    })
    return () => {
      userDataRef.off()
    }
  }, [firebase, refKey, userId])

  return userData
}
