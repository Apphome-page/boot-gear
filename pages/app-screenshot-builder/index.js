import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import MockUp from '../../pageComponents/MockUp'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>App Screenshot Builder</title>
      </Head>
      <div className='my-3 min-vh-100'>
        <Jumbotron fluid className='bg-transparent'>
          <Container className='text-center'>
            <h1>App Screenshot Builder</h1>
          </Container>
        </Jumbotron>
        <MockUp />
      </div>
    </>
  )
}
