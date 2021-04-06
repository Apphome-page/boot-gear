/* eslint-disable react/jsx-props-no-spreading */
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

import Router from 'next/router'
import { useAmp } from 'next/amp'
import NProgress from 'nprogress'

import { FirebaseAppProvider } from 'reactfire'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import { Modal, ModalBody, Alert } from 'react-bootstrap'
import { ToastProvider } from 'react-toast-notifications'
import {
  init as initSentry,
  ErrorBoundary as SentryErrorBoundary,
} from '@sentry/react'

import firebaseConfig from '../firebase.json'

import StoreProvider from '../utils/storeProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

// initialize Sentry
// TODO: Replace with actual Sentry dsn
// TODO: Set Environment Tag
initSentry({ dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0' })

// initialize nprogress
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
      <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={false}>
        <SEO />

        <ToastProvider
          placement='bottom-left'
          autoDismiss
          transitionDuration={55}
        >
          <StoreProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </StoreProvider>
        </ToastProvider>
      </FirebaseAppProvider>
    </SentryErrorBoundary>
  )
}

export default Bootgear
