import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'
import FrameTemplateSingle from '../../components/FrameTemplateSingle'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>App Sample Screenshot Generator</title>
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>App Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <Container className='my-3 min-vh-100'>
        <FrameTemplateSingle />
      </Container>
    </>
  )
}
