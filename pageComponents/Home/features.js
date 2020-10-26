import { Container, Media, Row, Col } from 'react-bootstrap'

import { FeatureImage, CardIcon } from './style'

export default function HomeFeatures() {
  return (
    <Container className='my-5 text-center'>
      <CardIcon
        data-src='/img/logo.png'
        className='my-3 mx-auto border-bottom'
      />
      <p className='h2 font-weight-bold'>Features that make us Stand Out</p>
      <p className='mt-3 mb-5'>
        We provide simple solutions to complex problems
      </p>
      <Row className='align-items-center text-left'>
        <Col lg={6} className='d-none d-lg-block'>
          <img src='/img/hero/hero-bg.png' alt='' className='w-100' />
        </Col>
        <Col lg={6}>
          <Media className='my-5'>
            <FeatureImage
              data-size='80'
              data-src='/img/feature/f1.png'
              className='mr-3'
            />
            <Media.Body>
              <div className='pb-3 lead font-weight-bold'>
                Home page for mobile apps
              </div>
              <p>
                You can create home page on web for your mobile apps using
                applanding.page for free !
              </p>
            </Media.Body>
          </Media>
          <Media className='my-5'>
            <FeatureImage
              data-size='80'
              data-src='/img/feature/f2.png'
              className='mr-3'
            />
            <Media.Body>
              <div className='pb-3 lead font-weight-bold'>
                Enhance your presence on app stores
              </div>
              <p>
                Applanding.page&apos;s powerful screenshot generator helps you
                create stunning screenshots for your mobile apps !
              </p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
    </Container>
  )
}
