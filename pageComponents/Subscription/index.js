import { Container, Row, Col } from 'react-bootstrap'

import { SubscriptionBox } from '../../components/Subscription'

import Features from '../Home/features'
import Pricing from '../Home/pricing'

export default function PrivacyPolicy() {
  return (
    <div className='subscription-wrap'>
      <section className='section-hero d-flex align-items-center'>
        <Container>
          <Row className='py-5 align-items-center'>
            <Col lg={6}>
              <h1 className='my-5 display-4 font-weight-bold text-center'>
                Create stunning app landing pages
              </h1>
              <p>Enter your email id to get started.</p>
              <SubscriptionBox
                append={false}
                className='my-3 subscription-box'
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Features />
      <Pricing />
      {/* <style jsx>
        {`
          .subscription-wrap .subscription-box {
            display: inline-block;
            text-align: center;
          }
          .subscription-wrap .section-hero {
            position: relative;
            background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
            background-color: #7b10ff;
            color: #fff;
          }

          @media (min-width: 992px) {
            .subscription-wrap .subscription-box {
              display: flex;
            }
            .subscription-wrap .section-hero {
              min-height: 70vh;
            }
            .subscription-wrap .section-hero:before {
              content: '';
              display: block;
              position: absolute;
              top: 3rem;
              bottom: 3rem;
              left: 50%;
              right: 0;
              background: url(/img/hero/hero-template.png) no-repeat right
                bottom/contain;
            }
          }
        `}
      </style> */}
    </div>
  )
}
