import { Container, Row, Col, Image } from 'react-bootstrap'

import { CardIcon } from './style'

export default function HomeFeatures() {
  return (
    <Container className='my-5'>
      <Row className='text-center'>
        <Col>
          <CardIcon
            data-src='/img/logo.png'
            className='my-3 mx-auto border-bottom'
          />
          <p className='h2 font-weight-bold'>Features that make us Stand Out</p>
          <p className='mt-3 mb-5'>
            We provide simple solutions to complex problems
          </p>
        </Col>
      </Row>
      <Row className='align-items-center border-top py-3'>
        <Col>
          <div className='px-2 bg-dark text-right rounded-top'>
            <span className='d-inline-block mx-1 p-1 bg-white rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-warning rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-danger rounded-circle' />
          </div>
          <Image
            className='border border-dark w-100'
            src='/img/feature/landing.jpg'
            alt='App Landing Page'
          />
        </Col>
        <Col>
          <div className='pb-3 lead font-weight-bold'>
            Landing page for mobile apps
          </div>
          <p>
            You can create landing page on web for your mobile apps using
            applanding.page for free !
          </p>
        </Col>
      </Row>
      <Row className='align-items-center border-top py-3'>
        <Col>
          <div className='px-2 bg-dark text-right rounded-top'>
            <span className='d-inline-block mx-1 p-1 bg-white rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-warning rounded-circle' />
            <span className='d-inline-block mx-1 p-1 bg-danger rounded-circle' />
          </div>
          <Image
            className='w-100 border border-dark'
            src='/img/feature/scr.jpg'
            alt='App Screenshot Generator'
          />
        </Col>
        <Col>
          <div className='pb-3 lead font-weight-bold'>
            Enhance your presence on app stores
          </div>
          <p>
            Applanding.page&apos;s powerful screenshot generator helps you
            create stunning screenshots for your mobile apps !
          </p>
        </Col>
      </Row>
      <Row className='align-items-center border-top' />
    </Container>
  )
}
