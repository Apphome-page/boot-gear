import { useCallback, useEffect, useRef } from 'react'
import {
  Container,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  InputGroup,
} from 'react-bootstrap'
import noop from 'lodash/noop'

import IconArrowRight from '@svg-icons/bootstrap/arrow-right-circle.svg'

import { useAlerts } from '../AlertPop'
import { useFirebaseApp } from '../LoginPop'

const addSubscriber = async (fireDatabase, email) => {
  if (!fireDatabase || !email) {
    return
  }
  await fireDatabase.ref(`subs/${email.replace(/\W/gi, '_')}`).set({
    email,
    location: window.location.href,
    timestamp: new Date().getTime(),
  })
}

export const SubscriptionBox = function SubscriptionBox({
  append = true,
  className,
}) {
  const emailRef = useRef(null)
  const { addAlert } = useAlerts()
  const firebaseApp = useFirebaseApp()
  const userDatabase = firebaseApp && firebaseApp.database()

  const actionSub = useCallback(async () => {
    if (!userDatabase) {
      addAlert('Please wait while we load-up.', { variant: 'warning' })
      return
    }
    if (emailRef.current.reportValidity()) {
      const validEmail = emailRef.current.value
      await addSubscriber(userDatabase, validEmail)
      addAlert('Thank you for subscribing!', { variant: 'success' })
    }
  }, [addAlert, userDatabase])

  return (
    <Container fluid className={className}>
      {append ? (
        <InputGroup>
          <FormControl
            type='email'
            placeholder='email@example.com'
            required
            ref={emailRef}
          />
          <InputGroup.Append>
            <Button onClick={actionSub} variant='light' className='border'>
              <IconArrowRight height='20' width='20' />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      ) : (
        <>
          <FormControl
            type='email'
            placeholder='email@example.com'
            required
            ref={emailRef}
            className='m-1'
          />
          <Button onClick={actionSub} variant='success' className='m-1'>
            Subscribe
          </Button>
        </>
      )}
    </Container>
  )
}

export default function Subscription({ show, onComplete = noop }) {
  const emailRef = useRef(null)
  const { addAlert } = useAlerts()

  const firebaseApp = useFirebaseApp()
  const userDatabase = firebaseApp && firebaseApp.database()
  const userId =
    firebaseApp &&
    firebaseApp.auth().currentUser &&
    firebaseApp.auth().currentUser.uid

  const actionSub = useCallback(async () => {
    if (!userDatabase) {
      addAlert('Please wait while we load-up.', { variant: 'warning' })
      return
    }
    const validEmail =
      emailRef.current.checkValidity() && emailRef.current.value
    if (validEmail) {
      await addSubscriber(userDatabase, validEmail)
      addAlert('Thank you for subscribing!', { variant: 'success' })
      onComplete()
    } else {
      emailRef.current.reportValidity()
    }
  }, [addAlert, onComplete, userDatabase])

  useEffect(() => {
    if (show && firebaseApp && userId) {
      onComplete()
    }
  }, [show, onComplete, userId, firebaseApp])

  if (firebaseApp && userId) {
    return ''
  }

  return (
    <Modal show={show} backdrop='static'>
      <ModalBody>
        <div className='my-1'>
          Please provide your email address, before resuming your download.
        </div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='email'
            placeholder='email@example.com'
            required
            ref={emailRef}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={actionSub}>Subscribe</Button>
      </ModalFooter>
    </Modal>
  )
}
