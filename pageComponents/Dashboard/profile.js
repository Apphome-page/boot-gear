import { useCallback, useContext, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'

import useUserData from '../../utils/useUserData'
import { StoreContext } from '../../utils/storeProvider'

export default function Profile() {
  const formRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const { plan: { title: planTitle } = {} } = useUserData()
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
      <div className='pb-1 mb-2 border-bottom lead text-dark'>Your Details</div>
      <Form ref={formRef} className='mb-5 p-2 border shadow-sm'>
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
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Plan</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='plan' defaultValue={planTitle} disabled />
        </InputGroup>
        <div className='text-right'>
          <Button variant='success' onClick={actionUpdate}>
            Update
          </Button>
        </div>
      </Form>
    </>
  )
}
