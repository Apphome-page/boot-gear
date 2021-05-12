import { Container, CardDeck, Card } from 'react-bootstrap'

import Link from '../../components/Tag/Link'
import Image from '../../components/Tag/Image'

export default function HomeCards() {
  return (
    <Container className='my-5'>
      <CardDeck>
        <Card bg='light' className='rounded-0 border-0 p-3'>
          <Card.Body className='cursor-pointer'>
            <Link href='/app-website-builder'>
              <div className='tight-wrap mb-3 p-3 rounded-circle bg-white'>
                <Image src='/img/feature/i1.png' height='32' width='32' />
              </div>
              <Card.Title className='font-weight-bold'>
                Landing page for Apps
              </Card.Title>
              <Card.Text>
                Build landing page for your mobile app. We have both free and
                paid plans.
              </Card.Text>
            </Link>
          </Card.Body>
        </Card>
        <Card bg='light' className='rounded-0 border-0 p-3'>
          <Card.Body className='cursor-pointer'>
            <Link href='/app-screenshot-generator'>
              <div className='tight-wrap mb-3 p-3 rounded-circle bg-white'>
                <Image src='/img/feature/i3.png' height='32' width='32' />
              </div>
              <Card.Title className='font-weight-bold'>
                Stunning screenshots
              </Card.Title>
              <Card.Text>
                Create stunning screen shots for your app store listing using
                our free tools.
              </Card.Text>
            </Link>
          </Card.Body>
        </Card>
        <Card bg='light' className='rounded-0 border-0 p-3'>
          <Card.Body className='cursor-pointer'>
            <Link href='/app-icon-generator'>
              <div className='tight-wrap mb-3 p-3 rounded-circle bg-white'>
                <Image src='/img/feature/i4.png' height='32' width='32' />
              </div>
              <Card.Title className='font-weight-bold'>
                Free icon generator
              </Card.Title>
              <Card.Text>
                Resize and create icons for mmobile devices using our free tool.
              </Card.Text>
            </Link>
          </Card.Body>
        </Card>
      </CardDeck>
    </Container>
  )
}
