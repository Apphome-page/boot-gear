import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'Android Icon Generator',
    desc:
      'Generate icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Android Icon Generator',
    desc:
      'Generate icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
  {
    title: 'Android Icon Generator',
    desc:
      'Generate icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.',
  },
]

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>
          Android Icon Generator - Generate high quality, perfect sized icons
          for your Android apps
        </title>
        <meta
          name='description'
          content='Free Android icon generator - Generate icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
        <meta
          property='og:title'
          content='Android Icon Generator - Generate high quality, perfect sized icons for your Android apps'
        />
        <meta
          property='og:description'
          content='Free Android icon generator - Generate icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>Android App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <IconGen preset={['android']} />
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
