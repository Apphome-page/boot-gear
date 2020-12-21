import { useContext, useCallback, useEffect, useRef } from 'react'
import {
  Container,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  InputGroup,
} from 'react-bootstrap'
import { ArrowRightCircle as IconArrowRight } from '@emotion-icons/bootstrap/ArrowRightCircle'

import { StoreContext } from '../../utils/storeProvider'

const addSubscriber = async (firebase, email) => {
  if (!firebase || !email) {
    return
  }
  await firebase
    .database()
    .ref(`subs/${email.replace(/\W/gi, '_')}`)
    .set({
      email,
      location: window.location.href,
      timestamp: new Date().getTime(),
    })
  window.alert('Thank You! for subscribing.')
}

export const SubscriptionBox = function SubscriptionBox({
  append = true,
  className,
}) {
  const emailRef = useRef(null)

  const [{ firebase }] = useContext(StoreContext)

  const actionSub = useCallback(async () => {
    if (emailRef.current.reportValidity()) {
      const validEmail = emailRef.current.value
      await addSubscriber(firebase, validEmail)
    }
  }, [firebase])

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
              <IconArrowRight size='20' />
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

  const [{ firebase, userAuth }] = useContext(StoreContext)

  const actionSub = useCallback(async () => {
    const validEmail =
      emailRef.current.checkValidity() && emailRef.current.value
    if (validEmail) {
      await addSubscriber(firebase, validEmail)
      if (onComplete && typeof onComplete === 'function') {
        onComplete()
      }
    } else {
      emailRef.current.reportValidity()
    }
  }, [firebase, onComplete])

  useEffect(() => {
    if (show && userAuth) {
      onComplete()
    }
  }, [show, onComplete, userAuth])

  if (show && userAuth) {
    return ''
  }

  return (
    <Modal show={show} backdrop='static'>
      <ModalBody>
        <div className='my-2'>
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
