/* eslint-disable react/jsx-props-no-spreading */
import 'rc-color-picker/assets/index.css'
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

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
import SEO from '../components/SEO'

import firebaseConfig from '../firebase.json'

// initialize firebase
try {
  firebase.initializeApp(firebaseConfig)
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
  return (
    <>
      <SEO />
      <StoreProvider store={{ firebase }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoreProvider>
    </>
  )
}

export default Bootgear
