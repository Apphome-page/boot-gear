import { Container, Row, Col } from 'react-bootstrap'

import Features from '../Home/features'
import Pricing from '../Home/pricing'

import { Hero, SubscribeInline } from './style'

export default function PrivacyPolicy() {
  return (
    <>
      <Hero className='d-flex align-items-center'>
        <Container>
          <Row className='py-5 align-items-center'>
            <Col lg={6}>
              <h1 className='my-2 display-4 font-weight-bold text-center'>
                Subscribe Now!
              </h1>
              <p>
                to stay up-to-date with new features, promotions, & our latest
                blog posts.
              </p>
              <SubscribeInline append={false} className='my-3' />
              <sub className='font-italic text-white-50'>
                You can trust us. we only send promo offers, not a single spam.
              </sub>
            </Col>
          </Row>
        </Container>
      </Hero>
      <Features />
      <Pricing />
    </>
  )
}
