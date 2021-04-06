import { useCallback, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useAuth } from 'reactfire'
import { useToasts } from 'react-toast-notifications'
import { captureException as captureExceptionSentry } from '@sentry/react'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Security',
}

export default function Security() {
  const passRef = useRef(null)

  const { addToast } = useToasts()
  const userAuth = useAuth()

  const actionUpdate = useCallback(async () => {
    const newPass = passRef.current.value
    // TODO: Enforce Password Format
    if (!newPass) {
      addToast('Enter New Password!', {
        appearance: 'error',
        autoDismiss: false,
      })
      return
    }
    try {
      await userAuth.updatePassword(newPass)
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
    passRef.current.value = ''
    addToast('Password Updated Successfully!', {
      appearance: 'success',
    })
  }, [addToast, userAuth])
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
