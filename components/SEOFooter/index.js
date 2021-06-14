import { Container, Row, Col } from 'react-bootstrap'
import Link from '../Tag/Link'

import productLinks from '../../pageData/_app/footerProductLinks.json'

export default function SEOFooter() {
  return (
    <Container fluid className='my-3 py-3 shadow'>
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
  )
}
