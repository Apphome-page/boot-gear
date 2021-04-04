import { useState, useCallback, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'

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
      const { default: fetch } = await import('cross-fetch')
      await fetch(FIRECLOUD_PAY_VALIDATE, {
        method: 'POST',
        body: JSON.stringify({
          hostedpage,
        }),
      })
      setPayState(true)
      router.push('/dashboard')
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
