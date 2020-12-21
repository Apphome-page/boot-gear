import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

import faqList from '../../pageData/app-screenshot-generator/faq.json'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>
          App Screenshot Generator - Create stunning screenshots for your iPhone
          and Android apps, easily, and for free
        </title>
        <meta
          name='description'
          content='Free Screenshot Generator - Best screenshot generator for your iPhone and Android apps.  Use it for free without login in.'
        />
        <meta
          property='og:title'
          content='App Screenshot Generator - Create stunning screenshots for your iPhone and Android apps, easily, and for free '
        />
        <meta
          property='og:description'
          content='Free Screenshot Generator - Best screenshot generator for your iPhone and Android apps.  Use it for free without login in.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>App Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <Container fluid className='my-3'>
        <MockUp />
      </Container>
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
