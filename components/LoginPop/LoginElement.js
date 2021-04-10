import { Modal, ModalBody } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useRouter } from 'next/router'

export default function LoginElement({
  isPop,
  isForced,
  signClear,
  firebaseApp,
}) {
  const router = useRouter()

  const userAuth = firebaseApp && firebaseApp.auth()
  const userId = userAuth && userAuth.currentUser && userAuth.currentUser.uid

  return (
    <Modal
      show={firebaseApp && !userId && (isPop || isForced)}
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
            signInOptions: [
              firebaseApp && firebaseApp.auth.EmailAuthProvider.PROVIDER_ID,
            ],
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
