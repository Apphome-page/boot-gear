import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Container, Jumbotron } from 'react-bootstrap'

const FrameTemplateSingle = dynamic(
  () => import('../../components/FrameTemplateSingle'),
  {
    ssr: false,
  }
)

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
