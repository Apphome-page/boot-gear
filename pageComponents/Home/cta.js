import { Container, Button } from 'react-bootstrap'

import { useLogin } from '../../components/LoginPop'
import Link from '../../components/LinkTag'

export default function HomeCTA() {
  const { signPop } = useLogin()
  return (
    <section className='py-5 bg-alt text-center text-white'>
      <Container className='my-5'>
        <div className='h1 mb-5'>
          Fallen in Love with our features? Get a free trial!
        </div>
        <Link href='/dashboard'>
          <Button
            variant='light'
            className='rounded-0 mr-1 mr-sm-3 mb-3 mb-sm-0 px-3 py-3'
          >
            Start Free Trial
          </Button>
        </Link>
        <Button
          variant='outline-light'
          className='rounded-0 px-3 py-3'
          onClick={signPop}
        >
          Sign Up
        </Button>
      </Container>
    </section>
  )
}
