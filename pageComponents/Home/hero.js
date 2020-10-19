import { Container, Row, Col, Button } from 'react-bootstrap'

import { Hero } from './style'

export default function HomeHero() {
  return (
    <Hero className='d-flex align-items-center'>
      <Container className='py-5'>
        <Row>
          <Col lg={6}>
            <h1 className='my-4 display-4 font-weight-bold'>
              Create websites for your mobile apps
            </h1>
            <p className='my-5'>
              Easily create feature rich, fast and responsive websites for your
              apps.
              <br />
              Creating stunning screenshots for app store listings.
              <br />
              Sign Up !
            </p>
            <Button variant='light' className='btn-alt mr-1 mr-sm-3'>
              Sign Up
            </Button>
            <Button variant='light' className='btn-alt2 mt-4 mt-sm-0'>
              View Pricing
            </Button>
          </Col>
        </Row>
      </Container>
    </Hero>
  )
}
