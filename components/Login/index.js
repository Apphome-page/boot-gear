import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
import { useAuth, useUser } from 'reactfire'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import {
  setUser as setUserSentry,
  configureScope as configureScopeSentry,
} from '@sentry/react'

import { StoreContext } from '../../utils/storeProvider'
import SignInProviders from '../../utils/getSignInProviders'

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
        <StyledFirebaseAuth
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
      <style global jsx>
        {`
          .firebaseui-container {
            max-width: none;
          }
          .firebaseui-title:after {
            content: '/ Sign up';
            margin: 0px 4px;
          }
          .mdl-button--primary.mdl-button--primary,
          .mdl-textfield--floating-label.is-focused .mdl-textfield__label {
            color: #7b10ff;
          }
          .mdl-button--raised.mdl-button--colored,
          .mdl-button--raised.mdl-button--colored:active,
          .mdl-button--raised.mdl-button--colored:focus:not(:active),
          .mdl-button--raised.mdl-button--colored:hover,
          .mdl-button--primary.mdl-button--primary.mdl-button--fab,
          .mdl-button--primary.mdl-button--primary.mdl-button--raised,
          .mdl-progress > .progressbar,
          .mdl-progress.mdl-progress--indeterminate > .bar1,
          .mdl-progress.mdl-progress__indeterminate > .bar1,
          .mdl-progress.mdl-progress--indeterminate > .bar3,
          .mdl-progress.mdl-progress__indeterminate > .bar3,
          .mdl-textfield__label:after,
          .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
            background-color: #7b10ff;
          }
        `}
      </style>
    </Modal>
  )
}
