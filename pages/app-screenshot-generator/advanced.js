import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import MockUp from '../../pageComponents/MockUp'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>Advanced App Screenshot Generator</title>
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>Advanced App Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <div className='my-3 min-vh-100'>
        <MockUp />
      </div>
    </>
  )
}
