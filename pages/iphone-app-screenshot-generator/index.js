import Head from 'next/head'
import { Container, Jumbotron } from 'react-bootstrap'

import FAQ from '../../components/FAQ'

import MockUp from '../../pageComponents/MockUp'

const faqList = [
  {
    title: 'How to use Applanding.page iPhone App  screenshot generator?',
    desc:
      'Drag a screenshot from your desktop(in PNG format).Customize the generated image and drag it to your desktop to save.Use multiple theme and templates for free and enhance your appstore listings.',
  },
  {
    title: 'What are USPs of Applanding page’s iPhone screenshot generator?',
    desc:
      '"Applanding page\'s Screenshot generator is really easy to use. You can generate Screenshot that are required for iPhone \
<br>Applanding.page\'s Screenshot generator does not send any data to server, hence is it fully secure and your data does not leave your browser.\
<br>No hidden cost or fee\
<br>Select from pre designed dozens of templates and create your own trendy screenshot.\
<br>Export in all sizes for  Apple store.\
<br>Designer look for screenshots in one click.',
  },
  {
    title: 'Why did we create iPhone App Screenshot Generator',
    desc:
      'App screenshots allow your app to show its features and functionalities to users that visit the product page. People gain more information out of your icons, videos, and screenshots than they do from your name and app description .The requirements can be difficult for the most seasoned developer to get their head around. That’s why we created our free tool. So that people like you (and us!) can generate app screenshots you need, in the sizes and formats required at the touch of a button.',
  },
  {
    title: 'Will screenshots follow Apple\'s guidelines ?',
    desc:
      'We are aware how crucial right app icon sizes are. Our screenshot generator makes sure we follow this format 			\
<br>iOS App Screenshot Sizes for iPhones			\
<br>Device Size	Device	Portrait Screenshot Size	Landscape Screenshot Size\
<br>6.5 inch	iPhone 11 Pro Max, iPhone 11, iPhone XS Max, iPhone XR	1242 x 2688 pixels	2688 x 1242 pixels\
<br>5.8 inch	iPhone 11 Pro, iPhone X, iPhone XS	1125 x 2436 pixels	2436 x 1125 pixels\
<br>5.5 inch	iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus	1242 x 2208 pixels	2208 x 1242 pixels\
<br>4.7 inch	iPhone 6, iPhone 6s, iPhone 7, iPhone 8	750 x 1334 pixels	1334 x 750 pixels\
<br>4 inch	iPhone SE	"640 x 1096 pixels (without status bar)\
<br>640 x 1136 pixels (with status bar)"	"1136 x 600 pixels (without status bar)\
<br>1136 x 640 pixels (with status bar)\
<br>3.5 inch	iPhone 4s	"640 x 920 pixels (without status bar)\
<br>640 x 960 pixels (with status bar)"	"960 x 600 pixels (without status bar)\
<br>960 x 640 pixels (with status bar)"',
  }
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
