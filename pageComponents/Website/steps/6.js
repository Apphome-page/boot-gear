import { useContext, useCallback, useMemo } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { useFirebaseApp, useAuth } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { StoreContext as HeadContext } from '../../../utils/storeProvider'
import { StoreContext } from '../helpers/store'

const ExceptionTags = {
  section: 'Website-Builder',
  subSection: 'Step-6',
}

export default function Step() {
  const [{ queueLoading, unqueueLoading }, modStore] = useContext(HeadContext)
  const [templateProps, updateStore] = useContext(StoreContext)

  const firebase = useFirebaseApp()
  const firebaseAuth = useAuth()

  const { uid: userId } = firebaseAuth.currentUser || {}
  const {
    appIcon,
    appName,
    appTitle,
    appDescription,
    prevAction,
    nextAction,
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
      modStore({ signPop: true })
      return
    }
    queueLoading()
    let uploadSuccess = false
    try {
      const { default: uploadWebsite } = await import('../helpers/upload')
      await uploadWebsite(firebase, templateProps.appKey, {
        templateProps,
        userId,
      })
      uploadSuccess = true
    } catch (err) {
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
      uploadSuccess = false
    }
    unqueueLoading()
    if (uploadSuccess) {
      nextAction()
    } else {
      modStore({
        alertVariant: 'danger',
        alertTimeout: -1,
        alertText: 'Something went wrong, while updating your website.',
      })
    }
  }, [
    firebase,
    modStore,
    nextAction,
    queueLoading,
    templateProps,
    unqueueLoading,
    updateStore,
    userId,
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
