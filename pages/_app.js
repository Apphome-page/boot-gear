/* eslint-disable react/jsx-props-no-spreading */
import 'nprogress/nprogress.css'
import '../styles/globals.scss'

import Router from 'next/router'
import dynamic from 'next/dynamic'
import { useAmp } from 'next/amp'

import NProgress from 'nprogress'
import noop from 'lodash/noop'

import { Modal, ModalBody, Alert } from 'react-bootstrap'
import {
  init as initSentry,
  ErrorBoundary as SentryErrorBoundary,
} from '@sentry/react'

import AlertProvider from '../components/Context/Alert'
import LoadingProvider from '../components/Context/Loading'
import LoginProvider from '../components/Context/Login'

import Layout from '../components/Layout'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const AmpGlobalStyles = dynamic(() => import('../components/Amp/GlobalStyles'))
const AmpHeader = dynamic(() => import('../components/Amp/Header'))

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
    <Modal backdrop size='lg' contentClassName='shadow-lg' onHide={noop}>
      <ModalBody dismissible as={Alert} variant='danger' className='m-0'>
        Something went Wrong.
      </ModalBody>
    </Modal>
  )
}

function Bootgear({ Component, pageProps }) {
  const isAmp = useAmp()

  return isAmp ? (
    <>
      <SEO />
      <AmpHeader />
      <Component {...pageProps} />
      <Footer />
      <AmpGlobalStyles />
    </>
  ) : (
    <SentryErrorBoundary fallback={<ErrorFallback />}>
      <LoadingProvider>
        <AlertProvider>
          <LoginProvider>
            <SEO />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LoginProvider>
        </AlertProvider>
      </LoadingProvider>
    </SentryErrorBoundary>
  )
}

export default Bootgear
