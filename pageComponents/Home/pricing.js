import {
  Container,
  Button,
  CardDeck,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import Link from 'next/link'

import ImageTag from '../../components/ImageTag'

import plans from '../../config/plans.json'

export default function HomePricing() {
  return (
    <section className='py-5 bg-light text-center text-dark'>
      <Container>
        <div className='tight-wrap my-3 p-3 border-bottom rounded-circle'>
          <ImageTag src='/img/logo.png' height='32' width='32' />
        </div>
        <p className='h2 font-weight-bold'>Plans & Pricing</p>
        <p className='mt-3 mb-5'>
          No credit card required. No risk. Free trial !
        </p>
        <CardDeck>
          {Object.keys(plans).map((planKey) => {
            const { title, cost, details } = plans[planKey]
            return (
              <Card className='rounded-0 border-0 p-3' key={planKey}>
                <Card.Body>
                  <Card.Title className='my-3'>{title}</Card.Title>
                  <Card.Text>
                    <span className='h1 font-weight-bold'>{cost}</span>/year
                  </Card.Text>
                </Card.Body>
                <ListGroup variant='flush' className='my-3 text-secondary'>
                  {details.map((detail, detailIndex) => (
                    <ListGroupItem key={detailIndex}>{detail}</ListGroupItem>
                  ))}
                </ListGroup>
                <Link href={`/payments/pre?plan=${planKey}`}>
                  <Button variant='alt' className='m-5'>
                    Get Started
                  </Button>
                </Link>
              </Card>
            )
          })}
        </CardDeck>
      </Container>
    </section>
  )
}
