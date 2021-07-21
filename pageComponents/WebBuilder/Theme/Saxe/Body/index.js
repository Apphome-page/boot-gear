/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container, Row, Col } from 'react-bootstrap'

import IconShield from '@svg-icons/bootstrap/shield-check.svg'
import IconFile from '@svg-icons/bootstrap/file-earmark-text.svg'
import IconPerson from '@svg-icons/bootstrap/person-badge.svg'

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
      <div className='intro'>
        <div className='intro-backdrop'>
          <div className='intro-backdrop-0 bg-theme' />
          <div className='intro-backdrop-1' />
          <div className='intro-backdrop-2' />
          <div className='intro-backdrop-3' />
        </div>
        <Header />
        <Container className='position-relative mt-5 pt-5'>
          <Row className='align-items-start'>
            <Col lg={6}>
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
                <Contact className='my-3' keyName='appLinkAndroid'>
                  <img
                    src={`${SITE_URL}/web/saxe/store-android.png`}
                    alt='Android Play Store'
                    className='my-1 mx-3 border border-light py-2 px-4 bg-light rounded-lg'
                  />
                </Contact>
                <Contact className='my-3' keyName='appLinkApple'>
                  <img
                    src={`${SITE_URL}/web/saxe/store-apple.png`}
                    alt='Apple App Store'
                    className='my-1 mx-3 border border-light py-2 px-4 bg-light rounded-lg'
                  />
                </Contact>
              </div>
            </Col>
            <Col lg={6} id='intro-banner'>
              <ImageEditor
                keyName='appBanner'
                alt=''
                className='mw-100 my-3'
                placeholderImage={`${SITE_URL}/web/saxe/banner.png`}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container id='container-feature' className='my-5 py-5 text-center'>
        <Row lg={3} className='my-5 py-5'>
          <Feature keyName='appFeature-1'>
            <IconShield height='28' width='28' className='text-primary' />
          </Feature>
          <Feature keyName='appFeature-2'>
            <IconFile height='28' width='28' className='text-warning' />
          </Feature>
          <Feature keyName='appFeature-3'>
            <IconPerson height='28' width='28' className='text-success' />
          </Feature>
        </Row>
      </Container>
      <div className='my-5 video-wrap'>
        <Video />
      </div>
      <Container
        id='container-screenshot'
        className='position-relative overflow-hidden'
      >
        <Screenshot
          keyName='appScreenshot-1'
          keyCaptionName='appScreenshot-1-caption'
          placeholderImage={`${SITE_URL}/web/saxe/scr_1.png`}
        />
        <Screenshot
          keyName='appScreenshot-2'
          keyCaptionName='appScreenshot-2-caption'
          placeholderImage={`${SITE_URL}/web/saxe/scr_2.png`}
          isAlternate
        />
      </Container>
      <Container
        fluid
        className='position-relative py-5 bg-light overflow-hidden'
      >
        <Testimonials className='container' />
      </Container>
      <Footer />
      <VideoScript />
    </div>
  )
}
