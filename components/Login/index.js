import { useRouter } from 'next/router'

import { useEffect, useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import { StoreContext } from '../../utils/storeProvider'

import { AuthWrap } from './style'

export default function Login() {
  const router = useRouter()
  const [{ firebase, userAuth, signPop, signForced }, modStore] = useContext(
    StoreContext
  )
  const userId = userAuth && userAuth.uid
  const userFirstLaunch = userAuth && userAuth.firstLaunch

  useEffect(() => {
    if (userFirstLaunch) {
      modStore({
        loadingPop: true,
      })
    }
    const firebaseStateListener = firebase
      .auth()
      .onAuthStateChanged((userAuthState) => {
        modStore({
          userAuth: userAuthState,
          loadingPop: false,
        })
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
      })
    return () => {
      // Clear Sentry User data
      configureScopeSentry((scope) => scope.setUser(null))
      firebaseStateListener()
    }
  }, [firebase, modStore, userFirstLaunch])

  return (
    <Modal
      show={
        // Do not show Modal it at start itself
        !userFirstLaunch &&
        // Do not show Modal if user is already signed-in
        !userId &&
        // Show modal if any of sign Flags is true, albiet previous conditions are satisfied
        (signPop || signForced)
      }
      onHide={() => {
        if (signForced && !userId) {
          router.replace('/')
        }
        modStore({ signPop: false })
      }}
      backdrop={signForced ? 'static' : true}
    >
      <Modal.Header closeButton />
      <ModalBody className='p-0'>
        <AuthWrap
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                modStore({ signPop: false })
              },
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      </ModalBody>
    </Modal>
  )
}
