import { useCallback, useContext, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useAuth } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { StoreContext } from '../../utils/storeProvider'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Profile',
}

export default function Profile() {
  const formRef = useRef(null)
  const [, modStore] = useContext(StoreContext)

  const userAuth = useAuth()

  const { displayName, email } = userAuth.currentUser || {}

  const actionUpdate = useCallback(async () => {
    const {
      displayName: { value: newDisplayName },
      email: { value: newEmail },
    } = formRef.current.elements
    if (newEmail !== email) {
      try {
        await userAuth.updateEmail(newEmail)
      } catch (err) {
        if (err.code === 'auth/requires-recent-login') {
          userAuth.signOut()
          modStore({
            alertTimeout: -1,
            alertVariant: 'info',
            alertText: 'Please Sign in again to continue.',
          })
          return
        }
        captureExceptionSentry(err, (scope) => {
          scope.setTags(ExceptionTags)
          return scope
        })
      }
    }
    if (newDisplayName !== userAuth.displayName) {
      await userAuth.updateProfile({
        displayName: newDisplayName,
      })
    }
    modStore({
      alertVariant: 'success',
      alertTimeout: -1,
      alertText: 'Profile Updated Successfully!',
    })
  }, [email, modStore, userAuth])
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
        <div className='text-right'>
          <Button variant='success' onClick={actionUpdate}>
            Update
          </Button>
        </div>
      </Form>
    </>
  )
}
