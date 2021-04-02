/* eslint-disable react/jsx-props-no-spreading */
import 'rc-color-picker/assets/index.css'
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useAmp } from 'next/amp'
import NProgress from 'nprogress'
import * as firebase from 'firebase/app'
// Add the Firebase services that are used
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'

import { Modal, ModalBody, Alert } from 'react-bootstrap'
import {
  init as initSentry,
  ErrorBoundary as SentryErrorBoundary,
} from '@sentry/react'

import firebaseConfig from '../firebase.json'

import StoreProvider from '../utils/storeProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const Login = dynamic(() => import('../components/Login'), {
  ssr: false,
})
const Loading = dynamic(() => import('../components/LoadingDialog'), {
  ssr: false,
})
const AlertDialog = dynamic(() => import('../components/AlertDialog'), {
  ssr: false,
})

// initialize Sentry
// TODO: Replace with actual Sentry dsn
// TODO: Set Environment Tag
initSentry({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' })

// initialize nprogress
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// initialize firebase
try {
  firebase.initializeApp(firebaseConfig)
} catch (e) {
  if (e.code !== 'app/duplicate-app') {
    throw e
  }
}

function ErrorFallback() {
  return (
    <Modal backdrop size='lg' contentClassName='shadow-lg' onHide={() => {}}>
      <ModalBody dismissible as={Alert} variant='danger' className='m-0'>
        Something went Wrong.
      </ModalBody>
    </Modal>
  )
}

function Bootgear({ Component, pageProps }) {
  const isAmp = useAmp()
  return isAmp ? (
    <Component {...pageProps} />
  ) : (
    <SentryErrorBoundary fallback={<ErrorFallback />}>
      <SEO />
      <StoreProvider
        // TODO: Init all store variables to maintain logic
        store={{
          firebase, // Firebase global variable
          userAuth: { firstLaunch: true }, // Current User Auth Details
          alertTimeout: 0, // Alert Popup timeout - Reset Condition
          alertText: '', // Alert Text - Reset Condition
          alertVariant: 'default', // Alert Variant - Reset Condition
          loadingPop: false, // Full screen blocking Loader
          signPop: false, // Dismissable Sign-In PopUp
          signForced: false, // Un-dismissable Sign-In PopUp
        }}
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
        <AlertDialog />
        <Loading />
        <Login />
      </StoreProvider>
    </SentryErrorBoundary>
  )
}

export default Bootgear
