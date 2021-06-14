import { Container, Row, Col, Button } from 'react-bootstrap'

import Link from '../../components/Tag/Link'

export default function HomeHero() {
  return (
    <div className='d-flex align-items-center hero-wrap'>
      <Container className='py-5'>
        <Row>
          <Col lg={6}>
            <h1 className='my-3 display-4 font-weight-bold'>
              Create app landing pages for your mobile apps
            </h1>
            <p className='my-5'>
              Easily create feature rich, fast and responsive app landing pages
              for your apps.
              <br />
              Creating stunning screenshots for app store listings.
            </p>
            <Link href='/dashboard/websites'>
              <Button variant='alt' className='mr-1 mr-sm-3'>
                Sign Up
              </Button>
            </Link>
            <Link href='/pricing'>
              <Button variant='alt2' className='mt-3 mt-sm-0'>
                View Pricing
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .hero-wrap {
          position: relative;
          background: url(/img/hero/hero-bg.png) no-repeat left center/cover;
          background-color: #7b10ff;
          color: #fff;
        }
        @media (min-width: 992px) {
          .hero-wrap {
            min-height: 100vh;
          }
          .hero-wrap:before {
            content: '';
            display: block;
            position: absolute;
            top: 3rem;
            bottom: 3rem;
            left: 50%;
            right: 0;
            background: url(/img/hero/hero-img.png) no-repeat right bottom;
            background-size: 100%;
          }
        }
      `}</style>
    </div>
  )
}
