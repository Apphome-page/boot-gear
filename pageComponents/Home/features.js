import { Container, Row, Col } from 'react-bootstrap'

import ImageTag from '../../components/ImageTag'

export default function HomeFeatures() {
  return (
    <Container className='my-5'>
      <Row className='text-center'>
        <Col>
          <div className='tight-wrap my-3 p-3 border-bottom rounded-circle'>
            <ImageTag src='/img/logo.png' height='32' width='32' />
          </div>
          <p className='h2 font-weight-bold'>Features that make us Stand Out</p>
          <p className='mt-3 mb-5'>
            We provide simple solutions to complex problems
          </p>
        </Col>
      </Row>
      <Row className='align-items-center border-top py-3'>
        <Col lg={6}>
          <div className='px-3 bg-dark text-right rounded-top'>
            <span className='d-inline-block mx-1 p-1 bg-white rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-warning rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-danger rounded-circle' />
          </div>
          <ImageTag
            className='border border-dark bg-dark w-100'
            width='600'
            height='272'
            layout='responsive'
            src='/img/feature/landing.jpg'
            alt='App Landing Page'
          />
        </Col>
        <Col lg={6}>
          <div className='py-3 lead font-weight-bold'>
            Landing page for mobile apps
          </div>
          <p>
            You can create landing page on web for your mobile apps using
            applanding.page for free !
          </p>
        </Col>
      </Row>
      <Row className='align-items-center border-top py-3'>
        <Col lg={6}>
          <div className='px-3 bg-dark text-right rounded-top'>
            <span className='d-inline-block mx-1 p-1 bg-white rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-warning rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-danger rounded-circle' />
          </div>
          <ImageTag
            className='border border-dark bg-dark w-100'
            width='600'
            height='249'
            layout='responsive'
            src='/img/feature/scr.jpg'
            alt='App Screenshot Generator'
          />
        </Col>
        <Col lg={6}>
          <div className='py-3 lead font-weight-bold'>
            Enhance your presence on app stores
          </div>
          <p>
            Applanding.page&apos;s powerful screenshot generator helps you
            create stunning screenshots for your mobile apps !
          </p>
        </Col>
      </Row>
    </Container>
  )
}
