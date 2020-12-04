import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'What is an app icon generator?',
    desc:
      'App Icons are the images you press on your smartphone while launching an application. As newer phones are released with higher resolution screens, higher resolution app icons are needed. Developers still want to maintain support for the older phones with lower resolution so when you create an app icon you need to create it in various size variations for the same image. This is true for both Android, iOS, Mac , Android and Apple watch. App icon generator generates these appropriately sized images for you.',
  },
  {
    title: 'Can we generate app icons on linux using Applanding.page\'s icon generator?',
    desc:
      'Yes, using Applanding.page you can generate app icons on linux as well, since you do not need to install any software to use Applanding.page\'s icon generator. ',
  },
  {
    title: 'What is the USP of Applanding.page\'s icon generator ?',
    desc:
      'The best thing about Applanding.page\'s icon generator is that it does not send any data to server, hence is it fully secure and your data does not leave your browser. Applanding page\'s app icon generator is really easy to use. You can generate icons that are required  with  a single click. There is no hidden cost or fee',
  },
  {
    title: 'Is Applanding.page icon generator free ?',
    desc:
      'Yes, using Applanding.page you can generate app icons for free',
  },
  {
    title: 'Which platforms are supported for creating app icons ?',
    desc:
      'Using Applanding.page you can create app icons for android, mac, watch and iOS',
  },
  {
    title: 'Is Applanding.page icon generator secure ? ?',
    desc:
      'Yes, it is fully secure as no data is transferred to server for icon generation.',
  },
  {
    title: 'Is Applanding.page icon generator free ?',
    desc:
      'Yes, using Applanding.page you can generate app icons for free',
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
