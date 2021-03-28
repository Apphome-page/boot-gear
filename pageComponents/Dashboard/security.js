import { useCallback, useContext, useRef } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { StoreContext } from '../../utils/storeProvider'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Security',
}

export default function Security() {
  const passRef = useRef(null)
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)
  const actionUpdate = useCallback(async () => {
    const newPass = passRef.current.value
    // TODO: Enforce Password Format
    if (!newPass) {
      modStore({
        alertVariant: 'danger',
        alertTimeout: -1,
        alertText: 'Enter New Password!',
      })
      return
    }
    try {
      await userAuth.updatePassword(newPass)
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        firebase.auth().signOut()
        modStore({
          alertVariant: 'info',
          alertTimeout: -1,
          alertText: 'Please Sign in again to continue.',
        })
        return
      }
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
    }
    passRef.current.value = ''
    modStore({
      userAuth: firebase.auth().currentUser,
      alertVariant: 'success',
      alertTimeout: -1,
      alertText: 'Password Updated Successfully!',
    })
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
