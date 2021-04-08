import { useState, useCallback } from 'react'
import {
  Alert,
  Button,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap'
import { useAuth } from 'reactfire'

import { captureException as captureExceptionSentry } from '@sentry/react'

const FIRECLOUD_DOMAIN_SETUP = process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_SETUP

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function DomainSetup({ webKey }) {
  const [isProcessing, setProcessing] = useState(false)
  const [alertData, setAlertData] = useState({})

  const userAuth = useAuth()

  const formSubmit = useCallback(
    async (formEvent) => {
      formEvent.preventDefault()
      const {
        key: { value: formKey },
        domain: { value: formDomain },
      } = formEvent.target.elements
      if (!formKey || !formDomain) {
        setAlertData({
          text: 'Please provide a valid domain.',
          type: 'danger',
        })
        return
      }
      setProcessing(true)
      setAlertData({})

      const [idToken, { default: fetch }] = await Promise.all([
        userAuth.currentUser.getIdToken(),
        import('cross-fetch'),
      ])

      try {
        const setupResp = await fetch(FIRECLOUD_DOMAIN_SETUP, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            webKey: formKey,
            webDomain: formDomain,
          }),
        })
        const setupData = await setupResp.json()
        if (setupResp.status >= 400) {
          throw new Error(`Something went wrong. ${JSON.stringify(setupData)}`)
        }
        setAlertData({
          text: 'Custom Domain successfully added.',
          type: 'info',
        })
      } catch (err) {
        setAlertData({
          text: 'Something went wrong.',
          type: 'danger',
        })
        captureExceptionSentry(err, (scope) => {
          scope.setTags(ExceptionTags)
          return scope
        })
      }
      setProcessing(false)
    },
    [userAuth.currentUser]
  )
  return (
    <Form className='py-3' onSubmit={formSubmit}>
      <div className='font-weight-bold text-center lead'>
        Connect your domain
      </div>
      <div className='my-1 text-center'>
        Enter the domain to use for your app website.
      </div>
      <FormControl name='key' defaultValue={webKey} className='d-none' />
      <InputGroup className='mx-auto my-5 w-75 shadow-sm'>
        <FormControl
          name='domain'
          placeholder='Ex. mysampleapp.com'
          className='text-center'
          disabled={isProcessing}
        />
        <InputGroup.Append>
          <Button
            disabled={isProcessing}
            variant='primary'
            className='bg-alt'
            type='submit'
          >
            {isProcessing ? (
              <Spinner animation='border' variant='light' size='sm' />
            ) : (
              'Connect'
            )}
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {alertData.text ? (
        <Alert variant={alertData.type} className='my-1 mini text-center'>
          {alertData.text}
        </Alert>
      ) : (
        ''
      )}
    </Form>
  )
}
