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

import useFireService from '../LoginPop/useFireService'
import useUser from '../LoginPop/useUser'

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
  const { firstPromise: firePromise, data: fireDatabase } = useFireService(
    'database'
  )

  const actionSub = useCallback(async () => {
    await firePromise
    if (emailRef.current.reportValidity()) {
      const validEmail = emailRef.current.value
      await addSubscriber(fireDatabase, validEmail)
      addAlert('Thank you for subscribing!', { variant: 'success' })
    }
  }, [addAlert, fireDatabase, firePromise])

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
  const { firstValue: userFirstValue, data: userAuth } = useUser()
  const {
    firstPromise: fireDatabasePromise,
    data: fireDatabase,
  } = useFireService('database')

  const userId = userAuth && userAuth.uid

  const actionSub = useCallback(async () => {
    await fireDatabasePromise
    const validEmail =
      emailRef.current.checkValidity() && emailRef.current.value
    if (validEmail) {
      await addSubscriber(fireDatabase, validEmail)
      addAlert('Thank you for subscribing!', { variant: 'success' })
      onComplete()
    } else {
      emailRef.current.reportValidity()
    }
  }, [fireDatabasePromise, fireDatabase, addAlert, onComplete])

  useEffect(() => {
    if (show && userFirstValue && userId) {
      onComplete()
    }
  }, [show, onComplete, userFirstValue, userId])

  if (userFirstValue && userId) {
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
