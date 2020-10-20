import { useCallback, useContext, useRef } from 'react'
import {
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

export default function Profile() {
  const formRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const { displayName, email } = userAuth || {}
  const actionUpdate = useCallback(async () => {
    const {
      displayName: { value: newDisplayName },
      email: { value: newEmail },
    } = formRef.current.elements
    if (newEmail !== userAuth.email) {
      try {
        await userAuth.updateEmail(newEmail)
      } catch (err) {
        if (err.code === 'auth/requires-recent-login') {
          window.alert('Please Sign in again to continue.')
          firebase.auth().signOut()
          return
        }
      }
    }
    if (newDisplayName !== userAuth.displayName) {
      await userAuth.updateProfile({
        displayName: newDisplayName,
      })
    }
    modStore({
      userAuth: firebase.auth().currentUser,
    })
    window.alert('Updated your Profile!')
  }, [firebase, modStore, userAuth])
  return (
    <>
      <div className='pb-2 mb-2 border-bottom lead text-dark'>Your Details</div>
      <Form ref={formRef}>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='displayName' defaultValue={displayName} />
        </InputGroup>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='email' defaultValue={email} />
        </InputGroup>
        <Container className='mt-5 text-right'>
          <Button variant='success' onClick={actionUpdate}>
            Update
          </Button>
        </Container>
      </Form>
    </>
  )
}
