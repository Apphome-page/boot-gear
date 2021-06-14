import {
  memo,
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  useMemo,
} from 'react'

import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import Element from './Element'

import getPlanDetails from '../../../utils/getPlanDetails'

const EMPTY_PROMISE = new Promise(() => {})

const FirebaseContext = createContext()
const AuthContext = createContext()
const LoginContext = createContext()

// Monkey-Patching Providers by memoizing to prevent re-render
const LoginElement = memo(Element)

const firebaseInitAction = async () => {
  const [firebase, { default: firebaseConfig }] = await Promise.all([
    import('firebase/app'),
    import('../../../firebase.json'),
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
  return firebase
}

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

export default function LoginProviderWrap({ children }) {
  // Values under FirebaseProvider
  const [firebaseLaunch, setFirebaseLaunch] = useState(false)
  const [firebasePromise, setFirebasePromise] = useState(EMPTY_PROMISE)
  const [firebaseApp, setFirebaseApp] = useState(null)
  // Values under AuthProvider
  const [userAuth, setUserAuth] = useState(null)
  // Values under LoginProvider
  const [{ isPop, isForced }, dispatchSign] = useReducer(
    (prevSignState, deltaSignState) => ({
      ...prevSignState,
      ...deltaSignState,
    }),
    { isPop: false, isForced: false }
  )

  useEffect(() => {
    let firebaseListener = () => {}
    setFirebasePromise(
      firebaseInitAction()
        .then((firebase) => {
          setFirebaseApp(firebase)
          return firebase.auth().onAuthStateChanged((authState) => {
            authSentryAction(authState)
            setUserAuth(authState)
            setFirebaseLaunch(true)
          })
        })
        .then((authListener) => {
          firebaseListener = authListener
        })
    )
    return () => {
      configureScopeSentry((scope) => scope.setUser(null))
      firebaseListener()
      setFirebasePromise(EMPTY_PROMISE)
      setFirebaseApp(null)
      setUserAuth(null)
      setFirebaseLaunch(false)
    }
  }, [])

  // Locking LoginProvider values
  const signActions = useMemo(
    () =>
      Object.freeze({
        signPop: () => {
          dispatchSign({ isPop: true })
        },
        signForced: () => {
          dispatchSign({ isForced: true })
        },
        signClear: () => {
          dispatchSign({ isPop: false, isForced: false })
        },
      }),
    [dispatchSign]
  )

  // Locking FirebaseProvider Values
  const firebaseValue = useMemo(
    () => Object.freeze({ firebaseLaunch, firebasePromise, firebaseApp }),
    [firebaseApp, firebaseLaunch, firebasePromise]
  )

  // TODO: Check if nested Context is performant?
  return (
    <>
      <FirebaseContext.Provider value={firebaseValue}>
        <AuthContext.Provider value={userAuth}>
          <LoginContext.Provider value={signActions}>
            {children}
          </LoginContext.Provider>
        </AuthContext.Provider>
      </FirebaseContext.Provider>
      <LoginElement
        isPop={isPop}
        isForced={isForced}
        signClear={signActions.signClear}
        userAuth={userAuth}
        firebaseApp={firebaseApp}
      />
    </>
  )
}

export const useLogin = () => {
  const signActions = useContext(LoginContext)
  return signActions
}

export const useUserAuth = () => {
  const userAuth = useContext(AuthContext)
  return userAuth
}

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext)
  return firebaseContext
}

export const useUserData = (refKey = '', { once = false } = {}) => {
  const [isFetched, setFetched] = useState(false)
  const [userData, setUserData] = useState({})

  const { firebaseApp, firebaseLaunch } = useContext(FirebaseContext)
  const userAuth = useContext(AuthContext)

  const userId = userAuth && userAuth.uid

  const snapValue = useCallback(
    (snapshot) => {
      const snapVal = snapshot.val() || {}
      if (!refKey) {
        // Add plan details into root request
        snapVal.plan = getPlanDetails(snapVal.plan_id)
      }
      setUserData(snapVal)
      setFetched(true)
    },
    [refKey]
  )

  useEffect(() => {
    if (!firebaseLaunch && !firebaseApp) {
      setFetched(false)
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
      setFetched(false)
    }
  }, [firebaseApp, firebaseLaunch, once, refKey, snapValue, userId])

  return [userData || {}, isFetched]
}
