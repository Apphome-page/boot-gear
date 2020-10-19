import { Container, Button } from 'react-bootstrap'

export default function HomeCTA() {
  return (
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
  )
}
