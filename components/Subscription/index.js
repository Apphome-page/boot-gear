import { useContext, useCallback, useEffect, useRef } from 'react'
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  InputGroup,
} from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

export default function Subscription({ show, onComplete }) {
  const emailRef = useRef(null)

  const [{ firebase, userAuth }] = useContext(StoreContext)

  const actionSub = useCallback(async () => {
    const validEmail =
      emailRef.current.checkValidity() && emailRef.current.value
    if (validEmail) {
      await firebase
        .database()
        .ref(`subs/${validEmail.replace(/\W/gi, '_')}`)
        .set({
          email: validEmail,
          location: window.location.href,
          timestamp: new Date().getTime(),
        })
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
          <FormControl type='email' required ref={emailRef} />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={actionSub}>Subscribe</Button>
      </ModalFooter>
    </Modal>
  )
}
