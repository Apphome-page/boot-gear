import { useContext, useCallback, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import noop from 'lodash/noop'

import IconInfo from '@svg-icons/bootstrap/info-circle.svg'

import { StoreContext } from '../helpers/store'

export default function Step() {
  const formRef = useRef(null)
  const [
    {
      nextAction,
      prevAction,
      appAndroid,
      appIos,
      appDownloads,
      appRatings,
      appVideo,
    },
    updateStore,
  ] = useContext(StoreContext)
  const nextBtnAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const appForm = formRef.current
      if (appForm && appForm.reportValidity() === true) {
        const formElements = appForm.elements
        const formAndroid = formElements.namedItem('appAndroid').value
        const formIos = formElements.namedItem('appIos').value
        const formDownloads = formElements.namedItem('appDownloads').value
        const formRatings = formElements.namedItem('appRatings').value
        const formVideo = formElements.namedItem('appVideo').value
        updateStore({
          appAndroid: formAndroid,
          appIos: formIos,
          appDownloads: formDownloads,
          appRatings: formRatings,
          appVideo: formVideo,
        })
        nextAction()
      }
    },
    [nextAction, updateStore]
  )
  return (
    <Form ref={formRef} onSubmit={noop}>
      <Container fluid>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Play Store Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link of your App on Google Play-Store
                </Tooltip>
              }
            >
              <IconInfo
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormControl
              id='appAndroid'
              name='appAndroid'
              defaultValue={appAndroid}
              type='url'
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Store Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link of your App on Apple iOS App Store
                </Tooltip>
              }
            >
              <IconInfo
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormControl
              id='appIos'
              name='appIos'
              defaultValue={appIos}
              type='url'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Downloads</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Total Downloads of your App
                </Tooltip>
              }
            >
              <IconInfo
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormControl
              id='appDownloads'
              name='appDownloads'
              defaultValue={appDownloads}
              type='number'
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Ratings</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Ratings of your App on Stores
                </Tooltip>
              }
            >
              <IconInfo
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormControl
              id='appRatings'
              name='appRatings'
              defaultValue={appRatings}
              type='number'
              step={0.1}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Video</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  URL of embedded video to include on the app website
                </Tooltip>
              }
            >
              <IconInfo
                height='16'
                width='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormControl
              id='appVideo'
              name='appVideo'
              defaultValue={appVideo}
              type='url'
            />
          </Col>
        </Row>
        <Row className='py-5'>
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
              variant='success'
              onClick={nextBtnAction}
              className='shadow rounded-0 w-100'
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}
