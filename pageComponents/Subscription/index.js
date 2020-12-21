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
              <h1 className='my-5 display-4 font-weight-bold text-center'>
                Create stunning app landing pages
              </h1>
              <p>Enter your email id to get started.</p>
              <SubscribeInline append={false} className='my-3' />
            </Col>
          </Row>
        </Container>
      </Hero>
      <Features />
      <Pricing />
    </>
  )
}
