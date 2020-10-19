import {
  Container,
  Button,
  CardDeck,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import { CardIcon } from './style'

export default function HomePricing() {
  return (
    <section className='py-5 bg-light text-center text-dark'>
      <Container>
        <CardIcon
          data-src='/img/logo.png'
          className='my-3 mx-auto border-bottom'
        />
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
  )
}
