import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

import faqList from '../../pageData/iphone-app-icon-generator/faq.json'

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
