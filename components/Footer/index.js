import { Container, Row, Col, Media } from 'react-bootstrap'
import Link from 'next/link'

import SubscriptionInline from '../Subscription/inline'

const resourceLinks = [
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
  },
  {
    name: 'Terms & Conditions',
    path: '/terms-and-conditions',
  },
  {
    name: 'Disclaimer',
    path: '/disclaimer',
  },
  {
    name: 'Contact Us',
    path: '/contact-us',
  },
]

const productLinks = [
  { name: 'App Icon Generator', path: '/app-icon-generator' },
  { name: 'Android Icon Generator', path: '/android-app-icon-generator' },
  { name: 'iPhone Icon Generator', path: '/iphone-app-icon-generator' },
  { name: 'iOS icon Generator', path: '/ios-app-icon-generator' },
  { name: 'App Screenshot Generator', path: '/app-screenshot-generator' },
  {
    name: 'Android App Screenshot Generator',
    path: '/android-app-screenshot-generator',
  },
  {
    name: 'iPhone App Screenshot Generator',
    path: '/iphone-app-screenshot-generator',
  },
  {
    name: 'iOS App Screenshot Generator',
    path: '/ios-app-screenshot-generator',
  },
]

export default function Footer() {
  return (
    <>
      <Container className='my-4 py-4 shadow'>
        <Row>
          <Col lg={12} className='mb-4 h1 font-weight-bold text-center'>
            Supported Products
          </Col>
          {productLinks.map(({ name, path }, index) => (
            <Col lg={3} key={index}>
              <Link passHref href={path} key={index}>
                <a
                  className='d-block my-2 text-muted text-decoration-none text-truncate'
                  href={path}
                >
                  {name}
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid className='bg-alt text-white py-5'>
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
              {resourceLinks.map(({ name, path }, index) => (
                <Link passHref href={path} key={index}>
                  <a className='d-block my-2 text-white' href={path}>
                    {name}
                  </a>
                </Link>
              ))}
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
      </Container>
    </>
  )
}
