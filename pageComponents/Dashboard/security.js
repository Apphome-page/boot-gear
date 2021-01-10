import { useCallback, useContext, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'

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
      <div className='pb-1 my-2 border-bottom lead text-dark'>Security</div>
      <Form className='p-2 mb-5 border shadow-sm'>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl type='password' name='password' ref={passRef} />
          <InputGroup.Append>
            <Button variant='success' onClick={actionUpdate}>
              Update
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  )
}
