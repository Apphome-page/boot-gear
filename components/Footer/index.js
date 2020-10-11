import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <div className='bg-dark text-light text-center py-5'>
      <Container>
        <Row>
          <Col>Copyright © 2020</Col>
        </Row>
      </Container>
    </div>
  )
}
