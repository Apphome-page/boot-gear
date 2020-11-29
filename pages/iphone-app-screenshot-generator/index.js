import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

const faqList = [
  {
    title: 'iPhone App Screenshot Generator',
    desc:
      'Best screenshot generator for your iPhone apps. Use multiple theme and templates for free and enhance your appstore listings.',
  },
  {
    title: 'iPhone App Screenshot Generator',
    desc:
      'Best screenshot generator for your iPhone apps. Use multiple theme and templates for free and enhance your appstore listings.',
  },
  {
    title: 'iPhone App Screenshot Generator',
    desc:
      'Best screenshot generator for your iPhone apps. Use multiple theme and templates for free and enhance your appstore listings.',
  },
]

export default function AppScr() {
  return (
    <>
      <Head>
        <title>
          iPhone App Screenshot Generator - Create stunning screenshots and
          mockups for your iPhone apps, easily, and for free !
        </title>
        <meta
          name='description'
          content='Best screenshot generator for your iPhone apps. Use multiple theme and templates for free and enhance your appstore listings.'
        />
        <meta
          property='og:title'
          content='iPhone App Screenshot Generator - Create stunning screenshots and mockups for your iPhone apps, easily, and for free !'
        />
        <meta
          property='og:description'
          content='Best screenshot generator for your iPhone apps. Use multiple theme and templates for free and enhance your appstore listings.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>iPhone App Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <Container fluid className='my-3'>
        <MockUp preset='iphone' />
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
