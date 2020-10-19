import { Container, Row, Col, Media } from 'react-bootstrap'

import SubscriptionInline from '../Subscription/inline'

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
            <div className='my-4 h5 font-weight-bold'>Connect</div>
            <Media className='mb-3'>
              <img
                src='https://www.unpkg.com/feather-icons@latest/dist/icons/home.svg'
                alt='home'
                height='24'
                width='24'
                className='mr-2 filter-invert'
              />
              <Media.Body>Noida, India</Media.Body>
            </Media>
            <Media className='mb-3'>
              <img
                src='https://www.unpkg.com/feather-icons@latest/dist/icons/phone.svg'
                alt='home'
                height='24'
                width='24'
                className='mr-2 filter-invert'
              />
              <Media.Body>
                +91 8750348350
                <p className='text-white-50'>Mon to Fri 9am to 6 pm</p>
              </Media.Body>
            </Media>
            <Media className='mb-3'>
              <img
                src='https://www.unpkg.com/feather-icons@latest/dist/icons/mail.svg'
                alt='home'
                height='24'
                width='24'
                className='mr-2 filter-invert'
              />
              <Media.Body>
                support@apphome.page
                <p className='text-white-50'>Send us your query anytime!</p>
              </Media.Body>
            </Media>
          </Col>
          <Col lg={3}>
            <div className='my-4 h5 font-weight-bold'>Newsletter</div>
            <p>
              You can trust us. we only send promo offers, not a single spam.
            </p>
            <SubscriptionInline />
          </Col>
        </Row>
        <Row className='my-5 text-center'>
          <Col>Copyright © 2020 | All rights reserved to Apphome.page</Col>
        </Row>
      </Container>
    </div>
  )
}
