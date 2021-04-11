import { useCallback, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useAlerts } from '../../components/AlertPop'
import useUser from '../../components/LoginPop/useUser'
import useFireService from '../../components/LoginPop/useFireService'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Profile',
}

// Do not handle non-login cases
// Expect user to be logged in
// Break on any auth-issue
export default function Profile() {
  const formRef = useRef(null)

  const { addAlert } = useAlerts()
  const { data: userAuth } = useUser()
  const { firstPromise: firstFireAuthPromise, data: fireAuth } = useFireService(
    'auth'
  )

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
          addAlert('Please Sign in again to continue.', {
            variant: 'info',
            autoDismiss: false,
          })
          await firstFireAuthPromise
          fireAuth.signOut()
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
  }, [addAlert, email, firstFireAuthPromise, userAuth])
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
