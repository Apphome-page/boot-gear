import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import dynamic from 'next/dynamic'
import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import getPlanDetails from '../../utils/getPlanDetails'

const LoginElement = dynamic(() => import('./LoginElement'), { ssr: false })

const EMPTY_PROMISE = new Promise(() => {})

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
  const [firebaseLaunch, setFirebaseLaunch] = useState(false)
  const [firebasePromise, setFirebasePromise] = useState(EMPTY_PROMISE)
  const [firebaseApp, setFirebaseApp] = useState(null)
  const [userAuth, setUserAuth] = useState(null)
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

  const fireFall = useCallback(async () => {
    const [firebase, { default: firebaseConfig }] = await Promise.all([
      import('firebase/app'),
      import('../../firebase.json'),
    ])
    await Promise.all([
      import('firebase/auth'),
      import('firebase/storage'),
      import('firebase/database'),
    ])
    try {
      firebase.initializeApp(firebaseConfig)
    } catch (error) {
      if (error.code !== 'app/duplicate-app') {
        // TODO: Send to Sentry
        throw error
      }
    }
    setFirebaseApp(firebase)
    return firebase.auth().onAuthStateChanged((authState) => {
      authSentryAction(authState)
      setUserAuth(authState)
      setFirebaseLaunch(true)
    })
  }, [])

  useEffect(() => {
    let firebaseListener = () => {}
    setFirebasePromise(
      fireFall().then((authListener) => {
        firebaseListener = authListener
      })
    )
    return () => {
      // Clear Sentry User data
      configureScopeSentry((scope) => scope.setUser(null))
      firebaseListener()
      setFirebaseApp(null)
    }
  }, [fireFall, setFirebaseApp])

  return (
    <LoginContext.Provider
      value={{
        signPop,
        signForced,
        signClear,
        userAuth,
        firebaseApp,
        firebasePromise,
        firebaseLaunch,
      }}
    >
      {children}
      <LoginElement
        isPop={isPop}
        isForced={isForced}
        signClear={signClear}
        userAuth={userAuth}
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

export const useFirebaseStatus = () => {
  const { firebaseLaunch, firebasePromise } = useContext(LoginContext) || {}
  return { firebaseLaunch, firebasePromise }
}

export const useUserAuth = () => {
  const { userAuth } = useContext(LoginContext) || {}
  return userAuth
}

export const useUserData = (refKey = '', { once = false } = {}) => {
  const [userData, setUserData] = useState({
    firstLaunch: true, // to indicate the userData has not been fetched
  })

  const { firebaseApp, userAuth } = useContext(LoginContext) || {}

  const userId = userAuth && userAuth.uid

  const snapValue = useCallback(
    (snapshot) => {
      const snapVal = snapshot.val() || {}
      if (!refKey) {
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
      return () => {}
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
