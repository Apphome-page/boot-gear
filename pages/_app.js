import 'rc-color-picker/assets/index.css'
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

import Head from 'next/head'
import Router from 'next/router'
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

import firebaseJSON from '../config/firebase.json'

// initialize firebase
try {
  firebase.initializeApp(firebaseJSON)
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
  // TODO: Global Alert System
  // TODO: Global Login Popup
  // TODO: Firebase Userdata from Database Listener
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
          href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
          rel='stylesheet'
        />
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
