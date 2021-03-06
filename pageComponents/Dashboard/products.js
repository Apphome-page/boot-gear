import { Container, Row, Col } from 'react-bootstrap'

import Link from '../../components/LinkTag'

export default function Products() {
  return (
    <Container fluid>
      <Row className='my-3 py-3 border shadow-sm'>
        <Col lg={8}>
          <div className='pb-1 lead font-weight-bold'>
            App Store Screenshots
          </div>
          <div className='mini'>Generate beautiful screenshots in minutes</div>
        </Col>
        <Col lg={4} className='align-self-center text-right'>
          <Link href='/app-screenshot-generator'>Create for FREE</Link>
        </Col>
      </Row>
      <Row className='my-3 py-3 border shadow-sm'>
        <Col lg={8}>
          <div className='pb-1 lead font-weight-bold'>App Store Icons</div>
          <div className='mini'>
            Generate responsive app icons for app store in minutes
          </div>
        </Col>
        <Col lg={4} className='align-self-center text-right'>
          <Link href='/app-icon-generator'>Create for FREE</Link>
        </Col>
      </Row>
    </Container>
  )
}
