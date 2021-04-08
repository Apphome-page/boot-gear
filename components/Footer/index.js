import { Container, Row, Col, Media } from 'react-bootstrap'
import Link from 'next/link'
import IconHouse from '@svg-icons/bootstrap/house.svg'
import IconPhone from '@svg-icons/bootstrap/telephone.svg'
import IconMail from '@svg-icons/bootstrap/envelope.svg'
import IconFacebook from '@svg-icons/bootstrap/facebook.svg'
import IconTwitter from '@svg-icons/bootstrap/twitter.svg'
import IconLinkedin from '@svg-icons/bootstrap/linkedin.svg'

import { SubscriptionBox } from '../Subscription'

import resourceLinks from '../../pageData/links/footerLinks.json'
import productLinks from '../../pageData/links/footerProducts.json'

export default function Footer() {
  return (
    <>
      <div className='my-3 py-3 shadow'>
        <Container>
          <Row>
            <Col lg={12} className='mb-3 h1 font-weight-bold text-center'>
              Supported Products
            </Col>
            {productLinks.map(({ name, path }, index) => (
              <Col lg={3} key={index}>
                <Link passHref href={path} key={index}>
                  <a
                    className='d-block my-1 text-muted text-decoration-none text-truncate'
                    href={path}
                  >
                    {name}
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Container fluid className='bg-alt text-white py-5'>
        <Container>
          <Row>
            <Col lg={3}>
              <div className='my-3 h5 font-weight-bold'>About Us</div>
              <p>
                We make fast, beautiful and responsive app landing pages for
                your mobile apps.
              </p>
            </Col>
            <Col lg={3}>
              <div className='my-3 h5 font-weight-bold'>Resources</div>
              {resourceLinks.map(({ name, path }, index) => (
                <Link passHref href={path} key={index}>
                  <a className='d-block my-1 text-white' href={path}>
                    {name}
                  </a>
                </Link>
              ))}
            </Col>
            <Col lg={3}>
              <div className='my-3 h5 font-weight-bold'>Connect</div>
              <Media className='mb-3'>
                <IconHouse height='24' width='24' />
                <Media.Body className='ml-1'>Noida, India</Media.Body>
              </Media>
              <Media className='mb-3'>
                <IconPhone height='24' width='24' />
                <Media.Body className='ml-1'>
                  +91 8750348350
                  <p className='text-white-50'>Mon to Fri 9am to 6 pm</p>
                </Media.Body>
              </Media>
              <Media className='mb-3'>
                <IconMail height='24' width='24' />
                <Media.Body className='ml-1'>
                  support@applanding.page
                  <p className='text-white-50'>Send us your query anytime!</p>
                </Media.Body>
              </Media>
            </Col>
            <Col lg={3}>
              <div className='my-3 h5 font-weight-bold'>Newsletter</div>
              <p>
                You can trust us. we only send promo offers, not a single spam.
              </p>
              <SubscriptionBox />
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
                <IconFacebook height='28' width='28' />
              </a>
              <a
                href='https://twitter.com/ApplandingP'
                className='text-white d-inline-block mx-1'
              >
                <IconTwitter height='28' width='28' />
              </a>
              <a
                href='https://www.linkedin.com/in/applanding-page-845a941ba/'
                className='text-white d-inline-block mx-1'
              >
                <IconLinkedin height='28' width='28' />
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}
