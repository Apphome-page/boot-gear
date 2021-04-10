import {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import dynamic from 'next/dynamic'
import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import getPlanDetails from '../../utils/getPlanDetails'

const LoginElement = dynamic(() => import('./LoginElement'), { ssr: false })

const LoginContext = createContext()

const authSentryAction = (authState) => {
  const { uid, displayName, email, phoneNumber, providerId } = authState || {}
  if (uid) {
    setUserSentry({
      id: uid,
      username: displayName,
      email,
      phone_number: phoneNumber,
      provider_id: providerId,
      ip_address: '{{auto}}',
    })
  } else {
    configureScopeSentry((scope) => scope.setUser(null))
  }
}

/*
 * Should be wrapped under:
 * -> Sentry
 * -> LoadingPop
 */
export default function LoginProvider({ children }) {
  const [firebaseApp, setFirebaseApp] = useState(null)
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

  useEffect(() => {
    let firebaseListener = () => {}
    Promise.all([
      import('../../firebase.json'),
      // TODO: Per-Need Fetch?
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/storage'),
      import('firebase/database'),
    ]).then(([firebaseConfig, firebase]) => {
      try {
        firebase.initializeApp(firebaseConfig)
      } catch (error) {
        if (error.code !== 'app/duplicate-app') {
          // TODO: Send to Sentry
          throw error
        }
      }
      setFirebaseApp(firebase)
      firebaseListener = firebase.auth().onAuthStateChanged(authSentryAction)
    })
    return () => {
      // Clear Sentry User data
      configureScopeSentry((scope) => scope.setUser(null))
      firebaseListener()
      setFirebaseApp(null)
    }
  }, [setFirebaseApp])

  return (
    <LoginContext.Provider
      value={{
        signPop,
        signForced,
        signClear,
        firebaseApp,
      }}
    >
      {children}
      <LoginElement
        isPop={isPop}
        isForced={isForced}
        signClear={signClear}
        firebaseApp={firebaseApp}
      />
    </LoginContext.Provider>
  )
}

export const useLogin = () => {
  const { signPop, signForced, signClear } = useContext(LoginContext) || {}
  return { signPop, signForced, signClear }
}

export const useFirebaseApp = () => {
  const { firebaseApp } = useContext(LoginContext) || {}
  return firebaseApp
}

export const useUserData = (refKey = '', { once = false } = {}) => {
  const [userData, setUserData] = useState({
    firstLaunch: true, // to indicate the userData has not been fetched
  })

  const { firebaseApp } = useContext(LoginContext) || {}

  const userId = useMemo(
    () =>
      firebaseApp &&
      firebaseApp.auth().currentUser &&
      firebaseApp.auth().currentUser.uid,
    [firebaseApp]
  )

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
    if (!firebaseApp) {
      setUserData({
        firstLaunch: true, // to indicate the userData has not been fetched
      })
    }
    const userDataRef = firebaseApp
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
  }, [firebaseApp, once, refKey, snapValue, userId])

  return userData || {}
}
