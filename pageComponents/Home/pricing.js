import {
  Container,
  Button,
  CardDeck,
  Card,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import Link from '../../components/Tag/Link'
import Image from '../../components/Tag/Image'

import plans from '../../config/plans.json'

export function OrderedPricing({ className, planOrder = -1 }) {
  return (
    <CardDeck className={className}>
      {Object.keys(plans).map((planKey) => {
        const { title, cost, details, order } = plans[planKey]
        return parseInt(order, 10) <= parseInt(planOrder, 10) ? (
          ''
        ) : (
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
                {planOrder < 0 ? 'Get Started' : 'Upgrade'}
              </Button>
            </Link>
          </Card>
        )
      })}
    </CardDeck>
  )
}

export default function HomePricing() {
  return (
    <section className='py-5 bg-light text-center text-dark'>
      <Container>
        <div className='tight-wrap my-3 p-3 border-bottom rounded-circle'>
          <Image src='/img/logo.png' height='32' width='32' />
        </div>
        <p className='h2 font-weight-bold'>Plans & Pricing</p>
        <p className='mt-3 mb-5'>
          No credit card required. No risk. Free trial !
        </p>
        <OrderedPricing planOrder={-1} />
      </Container>
    </section>
  )
}
