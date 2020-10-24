import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'Free iOS icon maker',
    desc:
      'Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Free iOS icon maker',
    desc:
      'Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Free iOS icon maker',
    desc:
      'Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
]

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>
          iOS Icon Generator - Generate high quality, perfect sized icons for
          your iOS apps
        </title>
        <meta
          name='description'
          content='Free iOS icon maker - Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
        <meta
          property='og:title'
          content='iOS Icon Generator - Generate high quality, perfect sized icons for your iOS apps'
        />
        <meta
          property='og:description'
          content='Free iOS icon maker - Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>iOS App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <IconGen preset={['mac']} />
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
