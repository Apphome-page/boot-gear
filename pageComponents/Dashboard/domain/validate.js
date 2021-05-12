import { useState, useCallback } from 'react'
import { Alert, Button, Spinner, Container, Row, Col } from 'react-bootstrap'
import { Code as CodeLoader } from 'react-content-loader'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useUserAuth, useUserData } from '../../../components/Context/Login'

const FIRECLOUD_DOMAIN_VALIDATE =
  process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_VALIDATE

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function DomainNameServer({ webKey }) {
  const [isProcessing, setProcessing] = useState(false)
  const [alertData, setAlertData] = useState({})

  const userAuth = useUserAuth()
  const [{ webDomain, webZone, webNameservers }, firstLaunch] = useUserData(
    `sites/${webKey}`
  )

  const verifySubmit = useCallback(async () => {
    setProcessing(true)
    setAlertData({})
    const [idToken, { default: fetch }] = await Promise.all([
      userAuth.getIdToken(),
      import('cross-fetch'),
    ])
    try {
      const verifyResp = await fetch(FIRECLOUD_DOMAIN_VALIDATE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          webKey,
          webDomain,
          webZone,
        }),
      })
      const verifyData = await verifyResp.json()
      if (verifyResp.status >= 400) {
        throw new Error(`Something went wrong. ${JSON.stringify(verifyData)}`)
      }

      let postAlertText = ''
      if (verifyData.active) {
        if (verifyData.paused) {
          postAlertText =
            'Your webpage has been flagged. Please remove the domain and try again.'
        } else {
          postAlertText = 'You Custom Domain is Validated!'
        }
      } else {
        postAlertText =
          'Verify Nameservers at you registrar and wait a while before Validating again.'
      }

      setAlertData({
        text: postAlertText,
        type: 'info',
      })
    } catch (err) {
      setAlertData({
        text: 'Something went wrong. Remove the domain & try again.',
        type: 'danger',
      })
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
    }
    setProcessing(false)
  }, [userAuth, webDomain, webKey, webZone])
  return firstLaunch ? (
    <CodeLoader />
  ) : (
    <Container fluid>
      <Row>
        <Col className='lead text-center'>
          <Alert variant='success'>
            Your domain ({webDomain}) is set up successfully.
          </Alert>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col className='mini'>
          Verify following Nameservers at your registrar.
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
              'Validate'
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
