import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import IconGen from '../../components/IconGen'

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>App Icon Generator</title>
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <IconGen />
    </>
  )
}
