import { useState, useCallback, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import useFetch from 'use-http'

const FIRECLOUD_PAY_VALIDATE = process.env.NEXT_PUBLIC_FIRECLOUD_PAY_VALIDATE

export default function Payment() {
  const [payState, setPayState] = useState({})

  const {
    query: { hostedpage },
  } = useRouter()

  const { post: verifyPay } = useFetch(FIRECLOUD_PAY_VALIDATE)

  const verifyAction = useCallback(async () => {
    if (!hostedpage) {
      return
    }
    try {
      await verifyPay({
        hostedpage,
      })
      setPayState(true)
    } catch (e) {
      setPayState(false)
    }
  }, [hostedpage, verifyPay])

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
