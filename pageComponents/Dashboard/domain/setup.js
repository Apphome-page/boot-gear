import { useState, useCallback, useContext } from 'react'
import {
  Alert,
  Button,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap'
import fetch from 'cross-fetch'

import { StoreContext } from '../../../utils/storeProvider'

const FIRECLOUD_DOMAIN_SETUP = process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_SETUP

export default function DomainSetup({ webKey }) {
  const [{ firebase }] = useContext(StoreContext)
  const [isProcessing, setProcessing] = useState(false)
  const [alertData, setAlertData] = useState({})
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
      const idToken = await firebase.auth().currentUser.getIdToken()
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
      } catch (e) {
        setAlertData({
          text: 'Something went wrong.',
          type: 'danger',
        })
      }
      setProcessing(false)
    },
    [firebase]
  )
  return (
    <Form className='py-2' onSubmit={formSubmit}>
      <div className='font-weight-bold text-center lead'>
        Connect your domain
      </div>
      <div className='my-2 text-center'>
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
        <Alert variant={alertData.type} className='my-2 mini text-center'>
          {alertData.text}
        </Alert>
      ) : (
        ''
      )}
    </Form>
  )
}