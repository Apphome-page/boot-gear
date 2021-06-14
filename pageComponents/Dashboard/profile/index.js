import { useCallback, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useAlerts } from '../../../components/Context/Alert'
import { useFirebase, useUserAuth } from '../../../components/Context/Login'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Profile',
}

export default function Profile() {
  const formRef = useRef(null)

  const { addAlert } = useAlerts()

  const { firebaseApp } = useFirebase()
  const userAuth = useUserAuth()

  const { displayName, email } = userAuth || {}

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
          firebaseApp.auth().signOut()
          addAlert('Please Sign in again to continue.', {
            variant: 'info',
            autoDismiss: false,
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
    addAlert('Profile Updated Successfully!', {
      variant: 'success',
    })
  }, [addAlert, email, userAuth])
  return (
    <>
      <div className='pb-1 mb-1 border-bottom lead text-dark'>Your Details</div>
      <Form ref={formRef} className='mb-5 p-3 border shadow-sm'>
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
