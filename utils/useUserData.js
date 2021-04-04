import { useState, useMemo, useCallback, useEffect } from 'react'
import { useFirebaseApp } from 'reactfire'

import getPlanDetails from './getPlanDetails'

export default function useUserData(refKey = '', { once = false } = {}) {
  const [userData, setUserData] = useState({
    firstLaunch: true, // to indicate the userData has not been fetched
  })

  const firebase = useFirebaseApp()
  const userId = useMemo(() => (firebase.auth().currentUser || {}).uid, [
    firebase,
  ])

  const snapValue = useCallback(
    (snapshot) => {
      const snapVal = snapshot.val()
      if (snapVal && !refKey) {
        // Add plan details into root request
        snapVal.plan = getPlanDetails(snapVal.plan_id)
      }
      setUserData(snapVal)
    },
    [refKey]
  )

  useEffect(() => {
    const userDataRef = firebase
      .database()
      .ref(`users/${userId}${refKey ? `/${refKey}` : ''}`)
    if (once) {
      userDataRef.once('value').then(snapValue)
    } else {
      userDataRef.on('value', snapValue)
    }
    return () => {
      userDataRef.off('value', snapValue)
      setUserData({
        firstLaunch: true, // to indicate the userData has not been fetched
      })
    }
  }, [firebase, once, refKey, snapValue, userId])

  return userData || {}
}
