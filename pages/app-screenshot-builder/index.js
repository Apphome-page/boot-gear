import Head from 'next/head'
import { Container } from 'react-bootstrap'

import MockUp from '../../pageComponents/MockUp'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>App Screenshot Builder</title>
      </Head>
      <div className='my-3 min-vh-100'>
        <Container className='py-3 text-center'>
          <h1>App Screenshot Builder</h1>
        </Container>
        <MockUp />
      </div>
    </>
  )
}
