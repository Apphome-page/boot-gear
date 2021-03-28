import { useContext, useCallback, useMemo } from 'react'
import { Container, Row, Col, Image, Button, SafeAnchor } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { StoreContext as HeadContext } from '../../../utils/storeProvider'
import { StoreContext } from '../helpers/store'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

const ExceptionTags = {
  section: 'Website-Builder',
  subSection: 'Step-6',
}

export default function Step() {
  const [{ firebase, userAuth }, modStore] = useContext(HeadContext)
  const [templateProps, updateStore] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid
  const {
    appIcon,
    appName,
    appTitle,
    appDescription,
    prevAction,
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
    modStore({ loadingPop: true })
    updateStore({ processing: true })
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
    updateStore({ processing: false })
    modStore({
      loadingPop: false,
      alertVariant: uploadSuccess ? 'success' : 'danger',
      alertTimeout: -1,
      alertText: uploadSuccess ? (
        <>
          Your website is generated!
          <br />
          Visit your website at:
          <SafeAnchor
            href={`${SITE_URL}/${templateProps.appKey}`}
            className='px-1'
          >
            {SITE_URL}/{templateProps.appKey}
          </SafeAnchor>
        </>
      ) : (
        'Something went wrong.'
      ),
    })
  }, [firebase, modStore, templateProps, updateStore, userId])

  return (
    <Container fluid>
      <Row>
        <Col>
          <Image src={appIconURI} thumbnail rounded />
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
