import { useContext, useCallback, useMemo } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

import { StoreContext as HeadContext } from '../../../utils/storeProvider'
import { StoreContext } from '../helpers/store'
import uploadWebsite from '../helpers/upload'

const createObjectURI = (url) => {
  let returnObj = null
  try {
    returnObj = window.URL.createObjectURL(url)
  } catch (e) {
    // Nothing
  }
  return returnObj
}

export default function Step() {
  const [{ firebase, userAuth }, modStore] = useContext(HeadContext)
  const [templateProps, updateStore] = useContext(StoreContext)
  const router = useRouter()

  const userId = userAuth && userAuth.uid
  const {
    appIcon,
    appName,
    appTitle,
    appDescription,
    prevAction,
  } = templateProps

  const appIconURI = useMemo(() => {
    return createObjectURI(appIcon)
  }, [appIcon])

  const actionUpload = useCallback(async () => {
    if (!userId) {
      modStore({ signPop: true })
      return
    }
    updateStore({ processing: true })

    try {
      await uploadWebsite(firebase, templateProps.appKey, {
        templateProps,
        userId,
      })
      window.alert(
        `Your website is generated!\nVisit your website at: https://applanding.page/${templateProps.appKey}`
      )
      router.push('/dashboard/websites')
      window.open(`https://applanding.page/${templateProps.appKey}`, '_blank')
    } catch (e) {
      window.alert('Something went wrong while updating your website.')
    }
    updateStore({ processing: false })
  }, [firebase, modStore, router, templateProps, updateStore, userId])

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
