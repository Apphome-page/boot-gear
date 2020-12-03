import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'

import SubscriptionInline from '../../components/Subscription/inline'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Subscribe</title>
      </Head>
      <Jumbotron>
        <h1 className='display-3 text-center'>Subscribe to Our Newsletter</h1>
      </Jumbotron>
      <Container fluid className='py-5 text-center text-light bg-alt'>
        <p>You can trust us. we only send promo offers, not a single spam.</p>
        <div style={{ maxWidth: '400px', display: 'inline-block' }}>
          <SubscriptionInline />
        </div>
      </Container>
    </>
  )
}
