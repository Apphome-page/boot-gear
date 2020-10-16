import Head from 'next/head'

import {
  Container,
  Row,
  Col,
  Button,
  CardDeck,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import { Hero, HeroImage, FeatureImage } from '../styles/components/home'

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage for mobile APPs, with free screenshots tools</title>
      </Head>
      <Hero>
        <Container className='py-5'>
          <Row>
            <Col lg={6}>
              <h1 className='py-4 display-4 font-weight-bold'>
                Create websites for your mobile apps
              </h1>
              <p>
                Easily create feature rich, fast and responsive websites for
                your apps.
                <br />
                Creating stunning screenshots for app store listings.
                <br />
                Sign Up !
              </p>
              <Button variane='info' className='btn-alt mr-1 mr-sm-3'>
                Sign Up
              </Button>
              <Button variane='info' className='btn-alt2 mt-4 mt-sm-0'>
                View Pricing
              </Button>
            </Col>
          </Row>
        </Container>
        <HeroImage className='d-lg-block d-none' />
      </Hero>
      <Container className='my-5'>
        <CardDeck>
          <Card bg='light' className='rounded-0 border-0 p-4'>
            <Card.Body>
              <FeatureImage data-src='/img/feature/i1.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Home page for Apps
              </Card.Title>
              <Card.Text>
                Build home page for your mobile app. We have both free and paid
                plans.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg='light' className='rounded-0 border-0 p-4'>
            <Card.Body>
              <FeatureImage data-src='/img/feature/i3.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Stunning screenshots
              </Card.Title>
              <Card.Text>
                Create stunning screen shots for your app store listing using
                our free tools.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg='light' className='rounded-0 border-0 p-4'>
            <Card.Body>
              <FeatureImage data-src='/img/feature/i4.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Free icon generator
              </Card.Title>
              <Card.Text>
                Resize and create icons for mmobile devices using our free tool.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
      <section className='py-5 bg-alt text-center text-white'>
        <Container className='my-5'>
          <div className='h1 mb-5'>
            Fallen in Love with our features? Get a free trial!
          </div>
          <Button
            variant='light'
            className='rounded-0 mr-1 mr-sm-3 mb-3 mb-sm-0 px-4 py-2'
          >
            Start Free Trial
          </Button>
          <Button variant='outline-light' className='rounded-0 px-4 py-2'>
            Sign Up
          </Button>
        </Container>
      </section>
      <section className='py-5 bg-light text-center text-dark'>
        <Container>
          <FeatureImage data-src='/img/logo.png' className='my-3 mx-auto' />
          <p className='h2 font-weight-bold'>Plans & Pricing</p>
          <p className='mt-3 mb-5'>
            No credit card required. No risk. Free trial !
          </p>
          <CardDeck>
            <Card className='rounded-0 border-0 p-4'>
              <Card.Body>
                <Card.Title className='my-4'>Free</Card.Title>
                <Card.Text>
                  <span className='h1 font-weight-bold'>$0</span>/year
                </Card.Text>
              </Card.Body>
              <ListGroup variant='flush' className='my-3 text-secondary'>
                <ListGroupItem>1 website on apphome.page</ListGroupItem>
                <ListGroupItem>Fully featured</ListGroupItem>
                <ListGroupItem>
                  5 templates for Screenshot Generator
                </ListGroupItem>
              </ListGroup>
              <Button variant='light' className='btn-alt m-5'>
                Get Started
              </Button>
            </Card>
            <Card className='rounded-0 border-0 p-4'>
              <Card.Body>
                <Card.Title className='my-4'>Pro</Card.Title>
                <Card.Text>
                  <span className='h1 font-weight-bold'>$79</span>/year
                </Card.Text>
              </Card.Body>
              <ListGroup variant='flush' className='my-3 text-secondary'>
                <ListGroupItem>1 website on your domain</ListGroupItem>
                <ListGroupItem>Fully featured</ListGroupItem>
                <ListGroupItem>
                  All templates available for Screenshot Generator
                </ListGroupItem>
              </ListGroup>
              <Button variant='light' className='btn-alt m-5'>
                Get Started
              </Button>
            </Card>
            <Card className='rounded-0 border-0 p-4'>
              <Card.Body>
                <Card.Title className='my-4'>Startup</Card.Title>
                <Card.Text>
                  <span className='h1 font-weight-bold'>$199+</span>/year
                </Card.Text>
              </Card.Body>
              <ListGroup variant='flush' className='my-3 text-secondary'>
                <ListGroupItem>3+ websites on your domains</ListGroupItem>
                <ListGroupItem>Fully featured</ListGroupItem>
                <ListGroupItem>
                  All templates available for Screenshot Generator
                </ListGroupItem>
              </ListGroup>
              <Button variant='light' className='btn-alt m-5'>
                Get Started
              </Button>
            </Card>
          </CardDeck>
        </Container>
      </section>
    </>
  )
}
