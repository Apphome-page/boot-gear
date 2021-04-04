import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import { useAuth, useUser } from 'reactfire'
import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import { StoreContext } from '../../utils/storeProvider'
import SignInProviders from '../../utils/getSignInProviders'

import { AuthWrap } from './style'

export default function Login() {
  const router = useRouter()
  const [
    { signPop, signForced, queueLoading, unqueueLoading },
    modStore,
  ] = useContext(StoreContext)
  const userAuth = useAuth()
  const { data: userData, hasEmitted: firstLaunch } = useUser()

  const { uid: userId } = userData || {}

  useEffect(() => {
    if (!firstLaunch) {
      queueLoading()
    }
    const firebaseStateListener = userAuth.onAuthStateChanged(
      (userAuthState) => {
        unqueueLoading()
        // IIFE to create setry-legible data
        if (userAuthState) {
          const sentryUserObj = (({
            uid,
            displayName,
            email,
            phoneNumber,
            providerId,
          }) => ({
            id: uid,
            username: displayName,
            email,
            phone_number: phoneNumber,
            provider_id: providerId,
            ip_address: '{{auto}}',
          }))(userAuthState)
          setUserSentry(sentryUserObj)
        } else {
          configureScopeSentry((scope) => scope.setUser(null))
        }
      }
    )
    return () => {
      // Clear Sentry User data
      configureScopeSentry((scope) => scope.setUser(null))
      firebaseStateListener()
    }
  }, [firstLaunch, queueLoading, unqueueLoading, userAuth])

  return (
    <Modal
      show={firstLaunch && !userId && (signPop || signForced)}
      onHide={() => {
        if (signForced && !userId) {
          router.replace('/')
        }
        modStore({ signPop: false, signForced: false })
      }}
      backdrop={signForced ? 'static' : true}
    >
      <Modal.Header closeButton />
      <ModalBody className='p-0'>
        <AuthWrap
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: SignInProviders,
            callbacks: {
              signInSuccessWithAuthResult: () => {
                modStore({ signPop: false, signForced: false })
              },
            },
          }}
          firebaseAuth={userAuth}
        />
      </ModalBody>
    </Modal>
  )
}
