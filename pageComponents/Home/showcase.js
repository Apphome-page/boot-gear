import { Container, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

export default function HomeShowcase() {
  return (
    <section className='bg-light'>
      <Container className='py-5'>
        <Row className='align-items-center'>
          <Col lg={6}>
            <p className='display-4 pb-3 pt-5'>
              Want to create a website for your mobile app?
            </p>
            <p>
              Your app is awesome. It needs an awesome website. Create it using
              applanding.page. We have both paid and free plans. If you wish to
              host it on your custom domain, you can use our paid plans, or just
              host it on applanding.page for free
            </p>
            <Link href='/app-website-builder'>
              <Button variant='light' className='my-5 btn-alt'>
                Browse free Demo
              </Button>
            </Link>
          </Col>
          <Col lg={6} className='d-none d-lg-block'>
            <img src='/img/hero/hero-bg.png' alt='' className='w-100' />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
