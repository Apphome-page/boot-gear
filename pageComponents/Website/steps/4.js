import { useState, useContext, useCallback, useRef } from 'react'
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
import { InfoCircle as IconInfo } from '@emotion-icons/bootstrap/InfoCircle'

import { StoreContext } from '../helpers/store'

export default function Step() {
  const formRef = useRef(null)
  const [tesimonialCount, setTestimonialCount] = useState(1)
  const incTestimonialCount = useCallback(() => {
    setTestimonialCount((prevTestim) => prevTestim + 1)
  }, [setTestimonialCount])
  const [
    { nextAction, prevAction, appAbout, appAddress },
    updateStore,
  ] = useContext(StoreContext)
  const nextBtnAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const appForm = formRef.current
      if (appForm && appForm.reportValidity() === true) {
        const formElements = appForm.elements
        const formAbout = formElements.namedItem('appAbout').value
        const formAddress = formElements.namedItem('appAddress').value
        const formTestim = []
        for (let idxTestim = 0; idxTestim < tesimonialCount; idxTestim += 1) {
          try {
            formTestim.push({
              text: document.getElementById(`testim-${idxTestim}-text`).value,
              source: document.getElementById(`testim-${idxTestim}-source`)
                .value,
            })
          } catch (e) {
            formTestim.push({})
          }
        }
        updateStore({
          appAbout: formAbout,
          appAddress: formAddress,
          appTestim: formTestim.filter(({ text }) => text),
        })
        nextAction()
      }
    },
    [nextAction, tesimonialCount, updateStore]
  )
  return (
    <Form ref={formRef}>
      <Container fluid>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>About Us</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Details of your App or your firm under `About Us` section
                </Tooltip>
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
              as='textarea'
              rows={3}
              id='appAbout'
              name='appAbout'
              defaultValue={appAbout}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Address</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Address of your firm under `Address` section
                </Tooltip>
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
              as='textarea'
              rows={3}
              id='appAddress'
              name='appAddress'
              defaultValue={appAddress}
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
            <span className='lead'>Testimonials</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  List of Testimonials for your app
                </Tooltip>
              }
            >
              <IconInfo
                size='16'
                className='ml-1 text-white-50 cursor-pointer'
              />
            </OverlayTrigger>
          </Col>
        </Row>
        {(() => {
          const testimList = []
          for (let idxTestim = 0; idxTestim < tesimonialCount; idxTestim += 1) {
            testimList.push(
              <Form.Row key={idxTestim} className='my-1'>
                <Col className='d-flex align-items-end'>
                  <span className='text-monospace small'>{idxTestim + 1}.</span>
                  <FormControl
                    id={`testim-${idxTestim}-text`}
                    className='ml-3'
                    as='textarea'
                    rows={2}
                    placeholder='Text'
                  />
                </Col>
                <Col>
                  <FormControl
                    id={`testim-${idxTestim}-source`}
                    placeholder='Source'
                    as='textarea'
                    rows={2}
                  />
                </Col>
              </Form.Row>
            )
          }
          return testimList
        })()}
        <Row className='m-3'>
          <Col>
            <Button
              variant='info'
              size='sm'
              className='shadow rounded-0 w-100'
              onClick={incTestimonialCount}
            >
              Add Testimonial
            </Button>
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
