import { Container, Button } from 'react-bootstrap'

import { CardIcon } from './style'

export default function HomeBlog() {
  return (
    <section className='bg-light'>
      <Container className='py-5 text-center'>
        <CardIcon
          data-src='/img/logo.png'
          className='my-3 mx-auto border-bottom'
        />
        <p className='h2 font-weight-bold'>Latest Posts from our Blog</p>
        <p className='mt-3 mb-5'>
          We are thought leaders in mobile app industry. Check out what our
          editors have written recently !
        </p>
        <Button variant='light' className='btn-alt'>
          Browse More
        </Button>
      </Container>
    </section>
  )
}
