import { useContext, useCallback, useMemo } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useAlerts } from '../../../components/AlertPop'
import { useLoading } from '../../../components/LoadingPop'
import {
  useFirebaseApp,
  useLogin,
  useUserAuth,
} from '../../../components/LoginPop'

import { StoreContext } from '../helpers/store'

const FIRECLOUD_DOMAIN_CONNECT =
  process.env.NEXT_PUBLIC_FIRECLOUD_DOMAIN_CONNECT

const ExceptionTags = {
  section: 'Website-Builder',
  subSection: 'Step-6',
}

export default function Step() {
  const [templateProps] = useContext(StoreContext)

  const { addAlert } = useAlerts()
  const { queueLoading, unqueueLoading } = useLoading()
  const { signPop } = useLogin()
  const firebaseApp = useFirebaseApp()
  const userAuth = useUserAuth()
  const userId = userAuth && userAuth.uid

  const {
    appIcon,
    appName,
    appTitle,
    appDescription,
    prevAction,
    nextAction,
    webEdit,
    webZone,
    webHost,
  } = templateProps

  const appIconURI = useMemo(() => {
    let returnObj = null
    try {
      returnObj = window.URL.createObjectURL(appIcon)
    } catch (e) {
      returnObj = null
    }
    return returnObj
  }, [appIcon])

  const actionUpload = useCallback(async () => {
    if (!userId) {
      signPop()
      return
    }
    queueLoading()
    let uploadSuccess = false
    try {
      const { default: uploadWebsite } = await import('../helpers/upload')
      const syncCustomDomain = webEdit && webZone && webHost
      await uploadWebsite(firebaseApp, templateProps.appKey, {
        templateProps,
        userId,
      })
      if (syncCustomDomain) {
        // Update s3
        const [idToken, { default: fetch }] = await Promise.all([
          userAuth.getIdToken(),
          import('cross-fetch'),
        ])
        const connectResp = await fetch(FIRECLOUD_DOMAIN_CONNECT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            webKey: webEdit,
          }),
        })
        const setupData = await connectResp.json()
        if (connectResp.status >= 400) {
          throw new Error(`Something went wrong. ${JSON.stringify(setupData)}`)
        }
        addAlert('Updated your website at Cusom Domain.', {
          variant: 'success',
        })
      }
      uploadSuccess = true
    } catch (err) {
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
      console.error(err)
      uploadSuccess = false
    }
    unqueueLoading()
    if (uploadSuccess) {
      nextAction()
    } else {
      addAlert('Something went wrong while updating your website.', {
        variant: 'danger',
        autoDismiss: false,
      })
    }
  }, [
    addAlert,
    firebaseApp,
    nextAction,
    queueLoading,
    signPop,
    templateProps,
    unqueueLoading,
    userAuth,
    userId,
    webHost,
    webEdit,
    webZone,
  ])

  return (
    <Container fluid>
      <Row>
        <Col>
          {appIconURI ? <Image src={appIconURI} thumbnail rounded /> : ''}
        </Col>
        <Col>
          <p>
            <span className='text-white-50 font-weight-bold'>Name: </span>
            {appName}
          </p>
          <p>
            <span className='text-white-50 font-weight-bold'>Title: </span>
            {appTitle}
          </p>
          <p>
            <span className='text-white-50 font-weight-bold'>
              Description:{' '}
            </span>
            {appDescription}
          </p>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <Button
            variant='light'
            onClick={prevAction}
            className='shadow rounded-0 w-100'
          >
            Back
          </Button>
        </Col>
        <Col>
          <Button
            onClick={actionUpload}
            variant='success'
            className='shadow w-100 rounded-0'
          >
            Publish
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
