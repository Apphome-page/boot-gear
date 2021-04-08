import { useMemo, useCallback, useEffect, useRef } from 'react'
import {
  Container,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  InputGroup,
} from 'react-bootstrap'
import { useUser, useDatabase } from 'reactfire'
import { useToasts } from 'react-toast-notifications'

import IconArrowRight from '@svg-icons/bootstrap/arrow-right-circle.svg'

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
  const userDatabase = useDatabase()
  const { addToast } = useToasts()

  const actionSub = useCallback(async () => {
    if (emailRef.current.reportValidity()) {
      const validEmail = emailRef.current.value
      await addSubscriber(userDatabase, validEmail)
      addToast('Thank you for subscribing!', { appearance: 'success' })
    }
  }, [addToast, userDatabase])

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

export default function Subscription({ show, onComplete }) {
  const emailRef = useRef(null)
  const { addToast } = useToasts()

  const userDatabase = useDatabase()
  const { data: userData, hasEmitted: firstLaunch } = useUser()

  const userId = useMemo(() => userData || {}, [userData])

  const actionSub = useCallback(async () => {
    const validEmail =
      emailRef.current.checkValidity() && emailRef.current.value
    if (validEmail) {
      await addSubscriber(userDatabase, validEmail)
      addToast('Thank you for subscribing!', { appearance: 'success' })
      if (onComplete && typeof onComplete === 'function') {
        onComplete()
      }
    } else {
      emailRef.current.reportValidity()
    }
  }, [addToast, onComplete, userDatabase])

  useEffect(() => {
    if (show && firstLaunch && userId) {
      onComplete()
    }
  }, [show, onComplete, firstLaunch, userId])

  if (firstLaunch && userId) {
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
