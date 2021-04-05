import { Alert, Container, Row, Col } from 'react-bootstrap'

export default function DomainNameServer({
  webData: { webDomain = '', webNameservers = [] },
}) {
  return (
    <Container fluid>
      <Row>
        <Col className='lead text-center'>
          <Alert variant='success'>
            Your domain ({webDomain}) is set up successfully.
          </Alert>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col className='mini'>
          Verify following Nameservers at your registrar.
        </Col>
      </Row>
      <Row className='align-items-center'>
        <Col>
          <pre className='d-block mx-auto my-0 p-2 w-75 text-dark bg-light shadow-sm'>
            {webNameservers.join('\n')}
          </pre>
        </Col>
      </Row>
    </Container>
  )
}
