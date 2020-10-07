import Head from 'next/head'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'rc-color-picker/assets/index.css'
import '../styles/globals.css'
import Link from 'next/link'

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
      <Link href='/'>
        <h1> HOME </h1>
      </Link>
      <Link href='/icons'>App Icon Generator</Link>
      <br />
      <Link href='/screenshots'>App Sample Screenshot Generator</Link>
      <br />
      <Link href='/screenshots/templates'>
        App Template Screenshot Generator
      </Link>
      <hr />
      <Component
        {...pageProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <hr />
      <footer>© Copyright</footer>
    </>
  )
}

export default Bootgear
