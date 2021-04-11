import { useCallback, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useAlerts } from '../../components/AlertPop'
import { useFirebaseApp, useUserAuth } from '../../components/LoginPop'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Security',
}

export default function Security() {
  const passRef = useRef(null)
  const { addAlert } = useAlerts()
  const firebaseApp = useFirebaseApp()
  const userAuth = useUserAuth()

  const actionUpdate = useCallback(async () => {
    const newPass = passRef.current.value
    // TODO: Enforce Password Format
    if (!newPass) {
      addAlert('Enter New Password!', {
        variant: 'danger',
        autoDismiss: false,
      })
      return
    }
    try {
      await userAuth.updatePassword(newPass)
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
    passRef.current.value = ''
    addAlert('Password Updated Successfully!', {
      variant: 'success',
    })
  }, [addAlert, userAuth])
  return (
    <>
      <div className='pb-1 my-1 border-bottom lead text-dark'>Security</div>
      <Form className='p-3 mb-5 border shadow-sm'>
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
