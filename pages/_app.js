import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'rc-color-picker/assets/index.css'
import '../styles/globals.css'

import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

// eslint-disable-next-line react/prop-types
function Bootgear({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppin&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <Component
        {...pageProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <Footer />
    </>
  )
}

export default Bootgear
