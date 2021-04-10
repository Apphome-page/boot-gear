import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import { useAuth, useUser } from 'reactfire'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { auth as firebaseAuth } from 'firebase'

import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import { useLoading } from '../LoadingPop'

/*
 * Should be wrapped under:
 * -> Sentry
 * -> reactfire
 * -> LoadingPop
 */
export default function LoginElement({ isPop, isForced, signClear }) {
  const router = useRouter()
  const { queueLoading, unqueueLoading } = useLoading()
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
      show={firstLaunch && !userId && (isPop || isForced)}
      onHide={() => {
        if (isForced && !userId) {
          router.replace('/')
        }
        signClear()
      }}
      backdrop={isForced ? 'static' : true}
    >
      <Modal.Header closeButton />
      <ModalBody className='p-0'>
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [firebaseAuth.EmailAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                signClear()
              },
            },
          }}
          firebaseAuth={userAuth}
        />
      </ModalBody>
    </Modal>
  )
}
