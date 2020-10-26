import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'What is the easiest way to create iPhone app icons ?',
    desc:
      'Applanding.page provides easiest way to create iPhone app icons',
  },
  {
    title: 'Of what size and format app icons are created for iPhone?',
    desc:
      'The app icons for iPhone are sized at 1024*1024 pixels. The screenshots are saved in PNG files.',
  },
  {
    title: 'What is the USP of Applanding.page icon generator for iPhone?',
    desc:
      'It is really easy to use. The USP of Applanding.page is that it is user friendly and allows to you generate app icons for iphone easily with just few clicks',
  },
]

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>
          iPhone Icon Generator - Generate high quality, perfect sized icons for
          your iPhone apps
        </title>
        <meta
          name='description'
          content='Free iPhone icon creator - Create icons for  your iPhone apps for free without login. 100% secure processing as no data is sent to server.'
        />
        <meta
          property='og:title'
          content='iPhone Icon Generator - Generate high quality, perfect sized icons for your iPhone apps'
        />
        <meta
          property='og:description'
          content='Free iPhone icon creator - Create icons for  your iPhone apps for free without login. 100% secure processing as no data is sent to server.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>iPhone App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <IconGen preset={['iphone']} />
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
