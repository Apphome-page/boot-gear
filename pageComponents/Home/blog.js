import { Container, Button } from 'react-bootstrap'

import Link from '../../components/LinkTag'
import Image from '../../components/ImageTag'

export default function HomeBlog() {
  return (
    <section className='bg-light'>
      <Container className='py-5 text-center'>
        <div className='tight-wrap my-3 p-3 border-bottom rounded-circle'>
          <Image src='/img/logo.png' height='32' width='32' />
        </div>
        <p className='h2 font-weight-bold'>Latest Posts from our Blog</p>
        <p className='mt-3 mb-5'>
          We are thought leaders in mobile app industry. Check out what our
          editors have written recently !
        </p>
        <Link href='/blog'>
          <Button variant='alt'>Browse More</Button>
        </Link>
      </Container>
    </section>
  )
}
