import 'rc-color-picker/assets/index.css'
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import * as firebase from 'firebase/app'
// Add the Firebase services that are used
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'

import StoreProvider from '../utils/storeProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'

// initialize firebase
try {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
  })
} catch (e) {
  if (e.code !== 'app/duplicate-app') {
    throw e
  }
}

// initialize nprogress
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function Bootgear({ Component, pageProps }) {
  const { pathname } = useRouter()
  return (
    <>
      <Head>
        <meta property='og:url' content={pathname} />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_storageBucket}/o/logo-apphome.png?alt=media`}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <link rel='canonical' href={pathname} />
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
          href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
          rel='stylesheet'
        />
        <base href='/' target='_blank' />
      </Head>
      <StoreProvider store={{ firebase }}>
        <Header />
        <Component
          {...pageProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <Footer />
      </StoreProvider>
    </>
  )
}

export default Bootgear
