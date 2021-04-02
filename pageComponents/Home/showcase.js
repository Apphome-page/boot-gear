import { Container, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeShowcase() {
  return (
    <section className='bg-light'>
      <Container className='py-5'>
        <Row className='align-items-center'>
          <Col lg={6}>
            <p className='display-4 pb-3 pt-5'>
              Want to create a landing page for your mobile app?
            </p>
            <p>
              Your app is awesome. It needs an awesome landing page. Create it
              using applanding.page. We have both paid and free plans. If you
              wish to host it on your custom domain, you can use our paid plans,
              or just host it on applanding.page for free
            </p>
            <Link href='/app-website-builder'>
              <Button variant='light' className='my-5 btn-alt'>
                Browse free Demo
              </Button>
            </Link>
          </Col>
          <Col lg={6} className='d-none d-lg-block'>
            <Image
              src='/img/hero/hero-bg.png'
              alt=''
              height='300'
              width='600'
              className='w-100'
              layout='responsive'
              sizes='50vw'
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
