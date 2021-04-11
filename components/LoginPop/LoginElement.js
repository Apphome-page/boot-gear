import { Modal, ModalBody } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useRouter } from 'next/router'

export default function LoginElement({
  isPop,
  isForced,
  signClear,
  userAuth,
  firebaseApp,
}) {
  const router = useRouter()

  const userId = userAuth && userAuth.uid

  // TODO: PUT LOADER?
  if (!firebaseApp) {
    return <></>
  }

  return (
    <Modal
      show={!userId && (isPop || isForced)}
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
          firebaseAuth={firebaseApp.auth()}
        />
      </ModalBody>
    </Modal>
  )
}
