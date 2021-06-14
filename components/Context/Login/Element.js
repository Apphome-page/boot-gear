import { Modal, ModalBody } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Loading from './Loading'

const StyledFirebaseAuth = dynamic(
  () => import('react-firebaseui/StyledFirebaseAuth'),
  {
    ssr: false,
    loading: Loading,
  }
)

export default function LoginElement({
  isPop,
  isForced,
  signClear,
  userAuth,
  firebaseApp,
}) {
  const router = useRouter()

  const userId = userAuth && userAuth.uid

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
        {firebaseApp ? (
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
            firebaseAuth={firebaseApp.auth()}
          />
        ) : (
          <Loading />
        )}
      </ModalBody>
    </Modal>
  )
}
