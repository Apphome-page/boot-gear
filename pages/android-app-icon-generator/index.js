import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'How to generate app icons for android ?',
    desc:
      'Using Applanding.page, just drag or upload an app icon image to generate app icon for android mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi..',
  },
  {
    title: 'How much time is requied to generate app icon for android ?',
    desc:
      'Using Applanding.page you can create professional app icons instantly.',
  },
  {
    title: 'What is the easiest way to generate app icons for android',
    desc:
      'Just with a few clicks you can create app icons for android using Applandingpage.',
  },
  {
    title: 'How much time is required for the app icon to be generated?',
    desc:
      'Within a few seconds your android app icons will be ready for download.',
  },
  {
    title: 'Can I use Applanding.page\'s android app icon generator on Linux?',
    desc:
      'Yes you can case Applanding.page\'s icon generator on Linux, as it is a web based software.',
  },
  {
    title: 'Can I create several Android app icon variations?',
    desc:
      'Yes, you can create several variations and download the icon that suits best for your app.',
  },
  {
    title: 'Will app icons generated for Android will be of right size?',
    desc:
      'We are aware how crucial right app icon sizes are. Our icon generator makes sure we follow this format. <br>Final size: 512px x 512px<br>Format: 32-bit PNG<br>Color space: sRGB<br>Max file size: 1024KB',
  },
  {
    title: 'What is the USP of Applanding page’s Android app icon generator?',
    desc:
      'Applanding page\'s Android icon generator is really easy to use. You can generate icons that are required for Android with  a single click. Applanding.page\'s icon generator does not send any data to server, hence is it fully secure and your data does not leave your browser. No hidden cost or fee',
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
