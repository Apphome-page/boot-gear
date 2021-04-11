import { Modal, ModalBody } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useRouter } from 'next/router'

import useUser from './useUser'

export default function LoginElement({
  isPop,
  isForced,
  signClear,
  firebaseApp,
}) {
  const router = useRouter()

  const { firstLaunch: firstUserLaunch, data: userAuth } = useUser()
  const userId = userAuth && userAuth.uid

  if (!firstUserLaunch) {
    return <></>
  }

  return (
    <Modal
      show={firstUserLaunch && !userId && (isPop || isForced)}
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
            signInOptions: [firebaseApp.auth.EmailAuthProvider.PROVIDER_ID],
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
