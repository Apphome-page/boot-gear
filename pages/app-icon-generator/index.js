import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'Free App icon generator',
    desc:
      'Generator icons for iOS, Android, Mac for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Free App icon generator',
    desc:
      'Generator icons for iOS, Android, Mac for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Free App icon generator',
    desc:
      'Generator icons for iOS, Android, Mac for free without login. 100% secure processing as no data is sent to server.',
  },
]

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>
          App icon generator - Generate perfect sized icons for any platform
        </title>
        <meta
          name='description'
          content='Free App icon generator - Generator icons for iOS, Android, Mac for free without login. 100% secure processing as no data is sent to server.'
        />
        <meta
          property='og:title'
          content='App icon generator - Generate perfect sized icons for any platform'
        />
        <meta
          property='og:description'
          content='Free App icon generator - Generator icons for iOS, Android, Mac for free without login. 100% secure processing as no data is sent to server.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>App icon generator</h1>
        </Container>
      </Jumbotron>
      <IconGen />
      {faqList.length ? (
        <Container fluid className='py-5 bg-light'>
          <FAQ faqList={faqList} />
        </Container>
      ) : (
        ''
      )}
    </>
  )
}
