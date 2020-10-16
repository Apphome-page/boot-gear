import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <div className='bg-alt text-white py-5'>
      <Container>
        <Row>
          <Col lg={3}>
            <div className='my-4 h5 font-weight-bold'>About Us</div>
            <p>
              We make mobile apps dynamic so that your users do not have to
              upgrade their apps for minor changes
            </p>
          </Col>
          <Col lg={3}>
            <div className='my-4 h5 font-weight-bold'>Resources</div>
            <a className='d-block my-2 text-white' href='/features'>
              Features
            </a>
            <a className='d-block my-2 text-white' href='/pricing'>
              Pricing
            </a>
            <a className='d-block my-2 text-white' href='/blog'>
              Blog
            </a>
            <a className='d-block my-2 text-white' href='/'>
              Contact Us
            </a>
          </Col>
          <Col lg={3}>
            <div className='my-4 h5 font-weight-bold'>Follow Us</div>
          </Col>
          <Col lg={3}>
            <div className='my-4 h5 font-weight-bold'>Newsletter</div>
            <p>
              You can trust us. we only send promo offers, not a single spam.
            </p>
          </Col>
        </Row>
        <Row className='my-5 text-center'>
          <Col>Copyright © 2020 | All rights reserved to Apphome.page</Col>
        </Row>
      </Container>
    </div>
  )
}
