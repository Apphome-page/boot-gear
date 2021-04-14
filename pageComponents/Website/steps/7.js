import { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from '../../../components/LinkTag'

import { StoreContext } from '../helpers/store'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function Step() {
  const [{ appKey }] = useContext(StoreContext)

  return (
    <Container fluid>
      <Row className='my-3 py-3 border-bottom'>
        <Col className='text-center'>
          <p className='lead'>Your website is generated!</p>
          Visit your website at:
          <a href={`${SITE_URL}/${appKey}`} className='px-1 text-white-50'>
            {SITE_URL}/{appKey}
          </a>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <Link href='/app-website-builder'>
            <Button variant='outline-light' className='shadow rounded-0 w-100'>
              Add New Website
            </Button>
          </Link>
        </Col>
        <Col>
          <Link href='/dashboard/websites'>
            <Button variant='light' className='shadow w-100 rounded-0'>
              View All Websites
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
