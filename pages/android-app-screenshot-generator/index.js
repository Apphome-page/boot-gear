import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

import faqList from '../../pageData/android-app-screenshot-generator/faq.json'

export default function AppScr() {
  return (
    <>
      <Head>
        <title>
          Android App Screenshot Generator - Create stunning screenshots for
          your Android apps, easily, and for free !
        </title>
        <meta
          name='description'
          content='Best screenshot generator for your Android apps. Use multiple theme and templates for free and enhance your playstore listings.'
        />
        <meta
          property='og:title'
          content='Android App Screenshot Generator - Create stunning screenshots for your Android apps, easily, and for free !'
        />
        <meta
          property='og:description'
          content='Best screenshot generator for your Android apps. Use multiple theme and templates for free and enhance your playstore listings.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>Android App Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <Container fluid className='my-3'>
        <MockUp preset='android' />
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
