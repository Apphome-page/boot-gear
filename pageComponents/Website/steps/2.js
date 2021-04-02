import { useContext, useCallback, useRef } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormFile,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { InfoCircle as IconInfo } from '@emotion-icons/bootstrap/InfoCircle'
import { StoreContext } from '../helpers/store'

export default function Step() {
  const appFormRef = useRef(null)
  const [
    { nextAction, prevAction, appTitle, appDescription },
    updateStore,
  ] = useContext(StoreContext)
  const nextBtnAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      updateStore({ processing: true })
      const appForm = appFormRef.current
      if (appForm && appForm.reportValidity() === true) {
        const formElements = appForm.elements
        const formTitle = formElements.namedItem('appTitle').value
        const formDescription = formElements.namedItem('appDescription').value
        const formIcon = formElements.namedItem('appIcon')
        const formScreenshot = formElements.namedItem('appScreenshot')
        updateStore({
          appTitle: formTitle,
          appDescription: formDescription,
          appIcon: formIcon.files[0],
          appScreenshot: formScreenshot.files[0],
          processing: false,
        })
        nextAction()
      } else {
        updateStore({
          processing: false,
        })
      }
    },
    [nextAction, updateStore]
  )
  return (
    <Form ref={appFormRef}>
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
                size='16'
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
                size='16'
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
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormFile
              id='appIcon'
              name='appIcon'
              accept='image/*'
              required
              label='Attach App Icon'
              custom
            />
          </Col>
        </Row>
        <Row className='mt-1 mb-3 ml-3 mr-0'>
          <Col>
            <FormFile
              id='appScreenshot'
              name='appScreenshot'
              accept='image/*'
              required
              label='Attach App Screenshot'
              custom
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
