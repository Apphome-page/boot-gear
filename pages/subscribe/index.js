import Head from 'next/head'

import Subscription from '../../pageComponents/Subscription'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Subscribe</title>
        <meta name='robots' content='noindex, follow' />
      </Head>
      <Subscription />
    </>
  )
}