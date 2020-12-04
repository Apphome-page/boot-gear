import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

const faqList = [
  {
    title: 'What is an app screenshot?',
    desc:
      'App screenshots have two simple jobs: grab the attention of the potential customer and convince them to download the app',
  },
  {
    title: 'How to use Applanding.page screenshot generator?',
    desc:
      'Drag a screenshot from your desktop(in PNG format). Customize the generated image and drag it to your desktop to save. Use multiple theme and templates for free and enhance your playstore listings.',
  },
  {
    title: 'What are key highlights of Applanding page’s screenshot generator?',
    desc:
      'Applanding page\'s App Screenshot generator is really easy to use. You can generate Screenshot that are required for iPhone and Android app with a single click. <br> Applanding.page\'s Screenshot generator does not send any data to server, hence is it fully secure and your data does not leave your browser. <br>No hidden cost or fee. <br>Select from pre designed dozens of templates and create your own trendy screenshot. <br>Export in all sizes for Google Play and Apple store. <br>Designer look for screenshots in one click.',
  },
  {
    title: 'How to use Applanding.page screenshot generator?',
    desc:
      'Drag a screenshot from your desktop(in PNG format). Customize the generated image and drag it to your desktop to save. Use multiple theme and templates for free and enhance your playstore listings.',
  },
]

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
