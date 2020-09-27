import Head from 'next/head'
import '../styles/globals.css'

function Bootgear({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default Bootgear
