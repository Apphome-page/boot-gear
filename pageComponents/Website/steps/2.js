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

import { useAlerts } from '../../../components/AlertPop'
import { useLoading } from '../../../components/LoadingPop'
import FileInput from '../../../components/FileInput'

import { StoreContext } from '../helpers/store'

export default function Step() {
  const appFormRef = useRef(null)
  const [
    {
      nextAction,
      prevAction,
      appTitle,
      appDescription,
      appIcon,
      appScreenshot,
    },
    updateStore,
  ] = useContext(StoreContext)

  const { addAlert } = useAlerts()
  const { queueLoading, unqueueLoading } = useLoading()

  const nextBtnAction = useCallback(
    async (event) => {
      event.preventDefault()
      event.stopPropagation()
      queueLoading()
      const appForm = appFormRef.current
      if (appForm && appForm.reportValidity() === true) {
        const formElements = appForm.elements
        const formTitle = formElements.namedItem('appTitle').value
        const formDescription = formElements.namedItem('appDescription').value
        const formIcon = formElements.namedItem('appIcon')
        const formScreenshot = formElements.namedItem('appScreenshot')

        if (!appIcon && !formIcon.files[0]) {
          addAlert('Please Providc an App Icon', {
            variant: 'danger',
          })
        } else if (!appScreenshot && !formScreenshot.files[0]) {
          addAlert('Please Providc an App Screenshot', {
            variant: 'danger',
          })
        } else {
          updateStore({
            appTitle: formTitle,
            appDescription: formDescription,
            appIcon: formIcon.files[0] || appIcon,
            appScreenshot: formScreenshot.files[0] || appScreenshot,
          })
          nextAction()
        }
      }
      unqueueLoading()
    },
    [
      addAlert,
      queueLoading,
      unqueueLoading,
      appIcon,
      appScreenshot,
      updateStore,
      nextAction,
    ]
  )

  return (
    <Form ref={appFormRef} onSubmit={noop}>
      <Container fluid>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Title</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>Title of your App</Tooltip>
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
              id='appTitle'
              name='appTitle'
              required
              defaultValue={appTitle}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>App Description</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>Description of your App</Tooltip>
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
              id='appDescription'
              name='appDescription'
              required
              as='textarea'
              rows='3'
              defaultValue={appDescription}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0 text-center'>
          <Col lg={6}>
            <FileInput
              height='128'
              width='128'
              id='appIcon'
              name='appIcon'
              label='Attach App Icon'
              accept='image/*'
              className='w-100'
              defaultValue={appIcon}
            />
          </Col>
          <Col lg={6}>
            <FileInput
              height='128'
              width='128'
              id='appScreenshot'
              name='appScreenshot'
              label='Attach App Screenshot'
              accept='image/*'
              className='w-100'
              defaultValue={appScreenshot}
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
