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
  {
    title: 'Why did we create this tool?',
    desc:
      'App screenshots allow your app to show its features and functionalities to users that visit the product page. People gain more information out of your icons, videos, and screenshots than they do from your name and app description .The requirements can be difficult for the most seasoned developer to get their head around. That’s why we created our free tool. So that people like you (and us!) can generate app screenshots you need, in the sizes and formats required at the touch of a button.',
  },
  {
    title: 'How do I know that the app screenshot is of right size?',
    desc:
      'We are aware how crucial right app icon sizes are. Our screenshot generator makes sure we follow this format 	
iOS App Screenshot Sizes for iPhones				
Device Size	Device	Portrait Screenshot Size	Landscape Screenshot Size	Requirement
6.5 inch	iPhone 11 Pro Max, iPhone 11, iPhone XS Max, iPhone XR	1242 x 2688 pixels	2688 x 1242 pixels	Required if app runs on iPhone
5.8 inch	iPhone 11 Pro, iPhone X, iPhone XS	1125 x 2436 pixels	2436 x 1125 pixels	Required if app runs on iPhone and 6.5 inch screenshots are not provided
5.5 inch	iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus	1242 x 2208 pixels	2208 x 1242 pixels	Required if app runs on iPhone
4.7 inch	iPhone 6, iPhone 6s, iPhone 7, iPhone 8	750 x 1334 pixels	1334 x 750 pixels	Required if app runs on iPhone and 5.5-inch screenshots are not provided
4 inch	iPhone SE	640 x 1096 pixels (without status bar)

640 x 1136 pixels (with status bar)	"1136 x 600 pixels (without status bar)

1136 x 640 pixels (with status bar)	Required if app runs on iPhone and 5.5- or 4.7-inch screenshots are not provided
3.5 inch	iPhone 4s	"640 x 920 pixels (without status bar)

640 x 960 pixels (with status bar)	960 x 600 pixels (without status bar)

960 x 640 pixels (with status bar)	Required if app runs on iPhone and 5.5 inch iPhone screenshots are not provided
				
Google Play Store				
The screenshots should not be less than 320 pixels or more than 3840 pixels.				
The files need to be in a JPEG or PNG format of 24 bits, in a 2:1 ratio if it is a portrait and a 16:9 ratio for landscapes				',
  }
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
