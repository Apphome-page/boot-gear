import { Container, Row, Col, Media } from 'react-bootstrap'
import Link from 'next/link'
import { House as IconHouse } from '@emotion-icons/bootstrap/House'
import { Telephone as IconPhone } from '@emotion-icons/bootstrap/Telephone'
import { Envelope as IconMail } from '@emotion-icons/bootstrap/Envelope'
import { Facebook as IconFacebook } from '@emotion-icons/feather/Facebook'
import { Twitter as IconTwitter } from '@emotion-icons/feather/Twitter'
import { Linkedin as IconLinkedin } from '@emotion-icons/feather/Linkedin'

import SubscriptionInline from '../Subscription/inline'

const resourceLinks = [
  {
    name: 'App Landing Pages Showcase',
    path: '/showcase',
  },
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
                We make fast, beautiful and responsive app landing pages for your mobile apps.
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
                <IconHouse size='24' />
                <Media.Body className='ml-2'>Noida, India</Media.Body>
              </Media>
              <Media className='mb-3'>
                <IconPhone size='24' />
                <Media.Body className='ml-2'>
                  +91 8750348350
                  <p className='text-white-50'>Mon to Fri 9am to 6 pm</p>
                </Media.Body>
              </Media>
              <Media className='mb-3'>
                <IconMail size='24' />
                <Media.Body className='ml-2'>
                  support@applanding.page
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
          <Row className='my-3 py-3 border-top'>
            <Col lg={8}>
              Copyright © 2020 | All rights reserved to Applanding.page
            </Col>
            <Col lg={4} className='text-right'>
              <a
                href='https://www.facebook.com/applanding.page'
                className='text-white d-inline-block mx-1'
              >
                <IconFacebook size='28' />
              </a>
              <a
                href='https://twitter.com/ApplandingP'
                className='text-white d-inline-block mx-1'
              >
                <IconTwitter size='28' />
              </a>
              <a
                href='https://www.linkedin.com/in/applanding-page-845a941ba/'
                className='text-white d-inline-block mx-1'
              >
                <IconLinkedin size='28' />
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}
