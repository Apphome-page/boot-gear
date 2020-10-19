import { useContext, useCallback, useEffect, useRef } from 'react'
import { Container, FormControl, InputGroup, Button } from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

export default function Subscription() {
  const emailRef = useRef(null)

  const [{ firebase, userAuth }] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  const actionSub = useCallback(async () => {
    if (emailRef.current.reportValidity()) {
      const validEmail = emailRef.current.value
      await firebase
        .database()
        .ref(`subs/${validEmail.replace(/\W/gi, '_')}`)
        .set({
          email: validEmail,
          location: window.location.href,
          timestamp: new Date().getTime(),
        })
    }
  }, [firebase])

  return userId ? (
    ''
  ) : (
    <Container fluid className='p-0'>
      <InputGroup>
        <FormControl type='email' required ref={emailRef} />
        <InputGroup.Append>
          <Button onClick={actionSub} variant='light'>
            <img
              src='https://www.unpkg.com/feather-icons@latest/dist/icons/arrow-right-circle.svg'
              alt=''
              height='20'
              width='20'
            />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  )
}
