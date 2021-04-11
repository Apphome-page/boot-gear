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
import IconInfo from '@svg-icons/bootstrap/info-circle.svg'

import { StoreContext } from '../helpers/store'

export default function Step() {
  const formRef = useRef(null)
  const [
    {
      nextAction,
      prevAction,
      appDiscord,
      appFacebook,
      appInstagram,
      appLinkedin,
      appMail,
      appPhone,
      appTelegram,
      appTwitch,
      appTwitter,
      appWhatsapp,
      appYoutube,
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
        const formDiscord = formElements.namedItem('appDiscord').value
        const formFacebook = formElements.namedItem('appFacebook').value
        const formInstagram = formElements.namedItem('appInstagram').value
        const formLinkedin = formElements.namedItem('appLinkedin').value
        const formMail = formElements.namedItem('appMail').value
        const formPhone = formElements.namedItem('appPhone').value
        const formTelegram = formElements.namedItem('appTelegram').value
        const formTwitch = formElements.namedItem('appTwitch').value
        const formTwitter = formElements.namedItem('appTwitter').value
        const formWhatsapp = formElements.namedItem('appWhatsapp').value
        const formYoutube = formElements.namedItem('appYoutube').value
        updateStore({
          appDiscord: formDiscord,
          appFacebook: formFacebook,
          appInstagram: formInstagram,
          appLinkedin: formLinkedin,
          appMail: formMail,
          appPhone: formPhone,
          appTelegram: formTelegram,
          appTwitch: formTwitch,
          appTwitter: formTwitter,
          appWhatsapp: formWhatsapp,
          appYoutube: formYoutube,
        })
        nextAction()
      }
    },
    [nextAction, updateStore]
  )
  return (
    <Form ref={formRef}>
      <Container fluid>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Discord Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Discord, to show under `Contact Us`
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
              id='appDiscord'
              name='appDiscord'
              defaultValue={appDiscord}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Facebook Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Facebook, to show under `Contact Us`
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
              id='appFacebook'
              name='appFacebook'
              defaultValue={appFacebook}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Instagram Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Instagram, to show under `Contact Us`
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
              id='appInstagram'
              name='appInstagram'
              defaultValue={appInstagram}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Linkedin Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Linkedin, to show under `Contact Us`
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
              id='appLinkedin'
              name='appLinkedin'
              defaultValue={appLinkedin}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Mail Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Mail, to show under `Contact Us`
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
            <FormControl id='appMail' name='appMail' defaultValue={appMail} />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Phone Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Phone, to show under `Contact Us`
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
              id='appPhone'
              name='appPhone'
              defaultValue={appPhone}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Telegram Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Telegram, to show under `Contact Us`
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
              id='appTelegram'
              name='appTelegram'
              defaultValue={appTelegram}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Twitch Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Twitch, to show under `Contact Us`
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
              id='appTwitch'
              name='appTwitch'
              defaultValue={appTwitch}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Twitter Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Twitter, to show under `Contact Us`
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
              id='appTwitter'
              name='appTwitter'
              defaultValue={appTwitter}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Whatsapp Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Whatsapp, to show under `Contact Us`
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
              id='appWhatsapp'
              name='appWhatsapp'
              defaultValue={appWhatsapp}
            />
          </Col>
        </Row>
        <Row>
          <Col className='d-inline-flex align-items-center'>
            <span className='lead'>Youtube Link</span>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='Tip for AppTheme'>
                  Link for Youtube, to show under `Contact Us`
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
              id='appYoutube'
              name='appYoutube'
              defaultValue={appYoutube}
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
