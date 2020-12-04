import { Container, Jumbotron } from 'react-bootstrap'
import Head from 'next/head'

import FAQ from '../../components/FAQ'

import IconGen from '../../pageComponents/IconGen'

const faqList = [
  {
    title: 'In which formats are icons created by Applanding.page for iOS apps?',
    desc:
      'Icons are created in PNG format.',
  },
  {
    title: 'What features should be looked for in an app icon maker?',
    desc:
      'An app icon maker should be able to make high quality icons, instantly and securely, to increase recognizability and uniqueness of apps.',
  },
  {
    title: 'Can we make iOS app icons for free?',
    desc:
      'Yes, iOS app icons can be created for free using applanding.page',
  },
  {
    title: 'How to generate iOS app icons online?',
    desc:
      'Using Applanding.page you can create icons for iOS apps without installing any software, online',
  },
  {
    title: 'Why did we create this ios app icon generator ?',
    desc:
      'Apple seems to have made the whole process quite complicated. We understand that they need the iconography and imagery used across the app store to be uniform but the requirements can be difficult for the most seasoned developer to get their head around. That’s why we created our free tool. So that people like you (and us!) can generate the icons you need, in the sizes and formats required at the touch of a button.',
  },
  {
    title: 'What is the USP of Applanding page’s iOS App Icon Generator?',
    desc:
      'Applanding page\'s iOS app icon generator is really easy to use. You can generate icons that are required for iOS with a single click. It does not send any data to server, hence is it fully secure and your data does not leave your browser. There are no hidden costs and it is absolutely free',
  },
  {
    title: 'How much time is required for the iOS app icons to be generated?',
    desc:
      'Within a few seconds your iOS app icons will be ready for download.',
  },
  {
    title: 'How can I extract the downloaded iOS app icon?',
    desc:
      'After extracting the zip file, you can simply copy the iOS icons in your iOS project.',
  },
  {
    title: 'Can I use Applanding.page iOS icon generator on Linux/Mac/Windows 10?',
    desc:
      'Since this is a web based software, you can use this any on operating system',
  },
  {
    title: 'How do I know that the iOS app icon is of right size?',
    desc:
      'We are aware how crucial right app icon sizes are. Our icon generator makes sure we follow this format. <br> iPhone - 180px × 180px (60pt × 60pt @3x) & 120px × 120px (60pt × 60pt @2x)<br> iPad Pro - 167px × 167px (83.5pt × 83.5pt @2x) <br> iPad, iPad mini - 152px × 152px (76pt × 76pt @2x) <br> App Store - 1024px × 1024px (1024pt × 1024pt @1x)',
  }
]

export default function AppIcon() {
  return (
    <>
      <Head>
        <title>
          iOS Icon Generator - Generate high quality, perfect sized icons for
          your iOS apps
        </title>
        <meta
          name='description'
          content='Free iOS icon maker - Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
        <meta
          property='og:title'
          content='iOS Icon Generator - Generate high quality, perfect sized icons for your iOS apps'
        />
        <meta
          property='og:description'
          content='Free iOS icon maker - Make icons for  your Android apps for free without login. 100% secure processing as no data is sent to server.'
        />
      </Head>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>iOS App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <IconGen preset={['mac']} />
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
