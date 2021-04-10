import {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import { useFirebaseApp } from 'reactfire'

import LoginElement from './LoginElement'

import getPlanDetails from '../../utils/getPlanDetails'

const LoginContext = createContext()

/*
 * Should be wrapped under:
 * -> Sentry
 * -> reactfire
 * -> LoadingPop
 */
export default function LoginProvider({ children }) {
  const [isPop, setPop] = useState(false)
  const [isForced, setForced] = useState()

  const signPop = useCallback(() => {
    setPop(true)
  }, [])

  const signForced = useCallback(() => {
    setForced(true)
  }, [])

  const signClear = useCallback(() => {
    setPop(false)
    setForced(false)
  }, [])

  return (
    <LoginContext.Provider value={{ signPop, signForced, signClear }}>
      {children}
      <LoginElement isPop={isPop} isForced={isForced} signClear={signClear} />
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
  const LoginCtx = useContext(LoginContext) || {}
  return LoginCtx || {}
}

export const useUserData = (refKey = '', { once = false } = {}) => {
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
