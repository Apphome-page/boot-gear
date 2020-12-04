import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

const faqList = [
  {
    title: 'What is Applanding.page\'s Android App Screenshot Generator',
    desc:
      'It is best screenshot generator for your Android apps. Use multiple theme and templates for free and enhance your playstore listings.',
  },
  {
    title: 'What is the purpose app of screenshot on Google play store?',
    desc:
      'App screenshots on Google Playstore has two simple jobs:\
<br>1. Grab the attention of the potential customers\
<Br>2. Convince them to download the app from play store',
  },
  {
    title: 'How to use Applanding.page Android screenshot generator?',
    desc:
      'Drag a screenshot from your desktop(in PNG format).Customize the generated image and drag it to your desktop to save.Use multiple theme and templates for free and enhance your playstore listings.',
  },
  {
    title: 'What are the key features of Applanding page’s Android screenshot generator?',
    desc:
      'Applanding page\'s Screenshot generator is really easy to use. You can generate Screenshot that are required for  Android app with a single click\
<br>Applanding.page\'s Screenshot generator does not send any data to server, hence is it fully secure and your data does not leave your browser.\
<br>No hidden cost or fee\
<br>Select from pre designed dozens of templates and create your own trendy screenshot.\
<br>Export in all sizes for Google Play\
<br>Designer look for screenshots in one click.',
  },
  {
    title: 'Why did we create this tool Android screenshot generator?',
    desc:
      'App screenshots allow your app to show its features and functionalities to users that visit the product page. People gain more information out of your icons, videos, and screenshots than they do from your name and app description .The requirements can be difficult for the most seasoned developer to get their head around. That’s why we created our free tool. So that people like you (and us!) can generate app screenshots you need, in the sizes and formats required at the touch of a button.',
  },
  {
    title: 'Will Android App Screenshot generated be of the right size?',
    desc:
      'Screenshot generated for your Android apps on Google play store will in line with Google\'s guidelines. The screenshots should not be less than 320 pixels or more than 3840 pixels. The files need to be in a JPEG or PNG format of 24 bits, in a 2:1 ratio if it is a portrait and a 16:9 ratio for landscapes',
  }
]

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
