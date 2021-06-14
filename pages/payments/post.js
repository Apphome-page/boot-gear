import { useState, useCallback, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import fetch from 'cross-fetch'

const FIRECLOUD_PAY_VALIDATE = process.env.NEXT_PUBLIC_FIRECLOUD_PAY_VALIDATE

export default function Payment() {
  const [payState, setPayState] = useState(false)

  const router = useRouter()
  const {
    query: { hostedpage },
  } = router

  const verifyAction = useCallback(async () => {
    if (!hostedpage) {
      return
    }
    try {
      const fetchResult = await fetch(FIRECLOUD_PAY_VALIDATE, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostedpage,
        }),
      })
      if (fetchResult.status >= 500) {
        throw new Error('Something went Wrong')
      }
      setPayState(true)
      router.push('/dashboard/websites')
    } catch (e) {
      setPayState(false)
    }
  }, [hostedpage, router])

  useEffect(() => {
    verifyAction()
  }, [verifyAction])

  return (
    <Container className='min-vh-100 py-5 d-flex display-4 justify-content-center align-items-baseline text-dark'>
      {payState ? (
        'Thank you.'
      ) : (
        <>
          Please Wait
          <Spinner className='mx-3' animation='grow' variant='dark' />
        </>
      )}
    </Container>
  )
}
