import { useState, useCallback } from 'react'
import { Alert, Button, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'

const FIRECLOUD_DOMAIN_VERIFY = process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_VERIFY

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function DomainVerify({
  webKey,
  webData: { webDomain = '', webNameservers = [] },
}) {
  const [isProcessing, setProcessing] = useState(false)
  const [alertData, setAlertData] = useState({})

  const userAuth = useAuth()

  const verifySubmit = useCallback(async () => {
    setProcessing(true)
    setAlertData({})
    const [idToken, { default: fetch }] = await Promise.all([
      userAuth.currentUser.getIdToken(),
      import('cross-fetch'),
    ])
    try {
      const verifyResp = await fetch(FIRECLOUD_DOMAIN_VERIFY, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          webKey,
        }),
      })
      const verifyData = await verifyResp.json()
      if (verifyResp.status >= 400) {
        throw new Error(`Something went wrong. ${JSON.stringify(verifyData)}`)
      }

      setAlertData({
        text:
          verifyData.active && !verifyData.paused
            ? 'Custom Domain Validated!'
            : 'Please verify the nameservers, or wait sometime before verifying again.',
        type: 'info',
      })
    } catch (err) {
      setAlertData({
        text:
          'Something went wrong. Please verify your nameservers and try after a while.',
        type: 'danger',
      })
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
    }
    setProcessing(false)
  }, [userAuth.currentUser, webKey])
  return (
    <Container fluid>
      <Row>
        <Col className='lead text-center'>
          <Alert variant='success'>
            Your domain ({webDomain}) was added successfully.
          </Alert>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col className='mini'>
          Please add following Nameservers at your registrar.
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col lg='8'>
          <pre className='d-block mx-auto my-0 p-3 w-75 text-dark bg-light shadow-sm'>
            {webNameservers.join('\n')}
          </pre>
        </Col>
        <Col lg='4'>
          <Button
            variant='alt'
            disabled={isProcessing}
            className='w-100'
            onClick={verifySubmit}
          >
            {isProcessing ? (
              <Spinner animation='border' variant='light' size='sm' />
            ) : (
              'Connect'
            )}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {alertData.text ? (
            <Alert variant={alertData.type} className='my-1 mini text-center'>
              {alertData.text}
            </Alert>
          ) : (
            ''
          )}
          <em className='d-block mt-5 mini text-muted font-weight-light'>
            Note: You may only submit a re-check once per hour.
          </em>
        </Col>
      </Row>
    </Container>
  )
}
