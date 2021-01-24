import { Container, CardDeck, Card } from 'react-bootstrap'
import Link from 'next/link'

import { CardIcon } from './style'

export default function HomeCards() {
  return (
    <Container className='my-5'>
      <CardDeck>
        <Link href='/app-website-builder'>
          <Card bg='light' className='rounded-0 border-0 p-4 cursor-pointer'>
            <Card.Body>
              <CardIcon data-src='/img/feature/i1.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Landing page for Apps
              </Card.Title>
              <Card.Text>
                Build landing page for your mobile app. We have both free and
                paid plans.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link href='/app-screenshot-generator'>
          <Card bg='light' className='rounded-0 border-0 p-4 cursor-pointer'>
            <Card.Body>
              <CardIcon data-src='/img/feature/i3.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Stunning screenshots
              </Card.Title>
              <Card.Text>
                Create stunning screen shots for your app store listing using
                our free tools.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link href='/app-icon-generator'>
          <Card bg='light' className='rounded-0 border-0 p-4 cursor-pointer'>
            <Card.Body>
              <CardIcon data-src='/img/feature/i4.png' className='mb-5' />
              <Card.Title className='font-weight-bold'>
                Free icon generator
              </Card.Title>
              <Card.Text>
                Resize and create icons for mmobile devices using our free tool.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardDeck>
    </Container>
  )
}
