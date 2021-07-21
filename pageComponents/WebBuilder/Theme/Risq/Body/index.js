/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container, Row, Col } from 'react-bootstrap'

import IconShield from '@svg-icons/bootstrap/shield-check.svg'
import IconLightning from '@svg-icons/bootstrap/lightning-charge.svg'
import IconTrophy from '@svg-icons/bootstrap/trophy.svg'

import TextEditor from '../../../components/Editor/Text'
import ImageEditor from '../../../components/Editor/Image'

import Header from './Header'
import Footer from './Footer'
import Feature from './Feature'
import Video, { VideoScript } from './Video'
import Testimonials from './Testimonials'
import Contact from './Contact'
import Screenshot from './Screenshot'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function Body({ children }) {
  const links = !children
  if (children) {
    return (
      <div className='position-relative main-body'>
        <div className='bg-theme'>
          <Header links={links} />
        </div>
        {children}
        <Footer />
      </div>
    )
  }
  return (
    <div className='position-relative main-body'>
      <div className='pb-5 intro hextro bg-theme'>
        <Header />
        <Container className='position-relative pt-5'>
          <Row className='align-items-start'>
            <Col lg={8} className='mt-5 pt-5'>
              <h1 className='text-white'>
                <TextEditor
                  keyName='appTitle'
                  placeholderText='This is your App Title'
                />
              </h1>
              <div className='mt-3 mb-5 p-3 lead font-weight-normal text-justify text-light'>
                <TextEditor
                  keyName='appDescription'
                  placeholderText='Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed consequuntur magni dolores ratione voluptatem sequi nesciunt.'
                />
              </div>
              <div id='container-store' className='d-flex flex-wrap'>
                <Contact
                  className='m-3 border border-white py-2 px-5 bg-white rounded-pill'
                  keyName='appLinkAndroid'
                >
                  <img
                    src={`${SITE_URL}/web/risq/store-android.png`}
                    alt='Android Play Store'
                  />
                </Contact>
                <Contact
                  className='m-3 border border-white py-2 px-5 bg-white rounded-pill'
                  keyName='appLinkApple'
                >
                  <img
                    src={`${SITE_URL}/web/risq/store-apple.png`}
                    alt='Apple App Store'
                  />
                </Contact>
              </div>
            </Col>
            <Col lg={4} id='intro-banner'>
              <ImageEditor
                keyName='appBanner'
                alt=''
                className='mw-100 my-3'
                placeholderImage={`${SITE_URL}/web/risq/banner.png`}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container id='container-feature' className='my-5 text-center'>
        <Row className='py-3'>
          <Col className='text-center'>
            <span className='lead text-uppercase text-black-50'>Features</span>
          </Col>
        </Row>
        <Row className='py-3'>
          <Feature keyName='appFeature-1' className='bg-primary'>
            <IconShield height='36' width='36' className='text-white-50' />
          </Feature>
          <Feature keyName='appFeature-2' className='bg-success'>
            <IconLightning height='36' width='36' className='text-white-50' />
          </Feature>
          <Feature keyName='appFeature-3' className='bg-warning'>
            <IconTrophy height='36' width='36' className='text-white-50' />
          </Feature>
        </Row>
      </Container>
      <div className='my-5 bg-light video-wrap'>
        <Video />
      </div>
      <Container
        id='container-screenshot'
        className='position-relative bg-light rounded-lg overflow-hidden'
      >
        <Screenshot
          keyName='appScreenshot-1'
          keyCaptionName='appScreenshot-1-caption'
          placeholderImage={`${SITE_URL}/web/risq/scr_1.png`}
        />
        <Screenshot
          keyName='appScreenshot-2'
          keyCaptionName='appScreenshot-2-caption'
          placeholderImage={`${SITE_URL}/web/risq/scr_2.png`}
          isAlternate
        />
      </Container>
      <Container fluid className='position-relative py-5 overflow-hidden'>
        <Testimonials className='container' />
      </Container>
      <Footer />
      <VideoScript />
    </div>
  )
}
