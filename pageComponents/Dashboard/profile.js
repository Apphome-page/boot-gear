import { useCallback, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useAuth } from 'reactfire'
import { useToasts } from 'react-toast-notifications'
import { captureException as captureExceptionSentry } from '@sentry/react'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Profile',
}

export default function Profile() {
  const formRef = useRef(null)

  const { addToast } = useToasts()
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
          addToast('Please Sign in again to continue.', {
            appearance: 'info',
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
    addToast('Profile Updated Successfully!', {
      appearance: 'success',
    })
  }, [addToast, email, userAuth])
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
