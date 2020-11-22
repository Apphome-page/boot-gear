import { useState, useContext, useEffect } from 'react'

import planConfig from '../config/plans.json'

import { StoreContext } from './storeProvider'

const planSilver = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const planGold = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD

export default function useUserData() {
  const [userData, setUserData] = useState({})
  const [{ firebase, userAuth }] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    const userDataRef = firebase.database().ref(`users/${userId}`)
    userDataRef.on('value', (snapshot) => {
      const snapVal = snapshot.val()
      switch (snapVal.plan_id) {
        case planSilver:
          snapVal.plan = { ...planConfig.silver }
          break
        case planGold:
          snapVal.plan = { ...planConfig.gold }
          break
        default:
          snapVal.plan = { ...planConfig.free }
          break
      }
      setUserData(snapVal)
    })
    return () => {
      userDataRef.off()
    }
  }, [firebase, userId])

  return userData
}
