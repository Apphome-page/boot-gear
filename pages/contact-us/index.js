import { Jumbotron, Container } from 'react-bootstrap'
import Head from 'next/head'

export default function Features() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Jumbotron>
        <h1 className='display-3 text-center'>Contact Us</h1>
      </Jumbotron>
      <Container className='min-vh-100 my-5 text-justify'>
        If you have any questions or concerns, you may contact us by sending an
        e-mail to care@apphome.page.
      </Container>
    </>
  )
}
