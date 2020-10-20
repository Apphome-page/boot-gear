import { useCallback, useContext, useRef } from 'react'
import {
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

export default function Security() {
  const passRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const actionUpdate = useCallback(async () => {
    const newPass = passRef.current.value
    if (!newPass) {
      return
    }
    try {
      await userAuth.updatePassword(newPass)
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        window.alert('Please Sign in again to continue.')
        firebase.auth().signOut()
        return
      }
    }
    passRef.current.value = ''
    modStore({
      userAuth: firebase.auth().currentUser,
    })
    window.alert('Updated your Password!')
  }, [firebase, modStore, userAuth])
  return (
    <>
      <div className='pb-2 mb-2 border-bottom lead text-dark'>Security</div>
      <Form>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type='password' name='password' ref={passRef} />
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
