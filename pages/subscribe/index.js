import Head from 'next/head'
import dynamic from 'next/dynamic'

const Subscription = dynamic(
  () => import('../../pageComponents/Subscription'),
  { ssr: false }
)

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
