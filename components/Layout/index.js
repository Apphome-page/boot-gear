import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '../Header'
import Footer from '../Footer'
import SEOFooter from '../SEOFooter'

const BASE_URI = process.env.NEXT_PUBLIC_SITE_URL

export default function Layout({ children }) {
  const { pathname } = useRouter()
  if (!pathname.indexOf('/dashboard/website-')) {
    return <>{children}</>
  }
  if (!pathname.indexOf('/dashboard')) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  }
  return (
    <>
      <Head>
        <base href={BASE_URI.endsWith('/') || `${BASE_URI}/`} target='_blank' />
      </Head>
      <Header />
      {children}
      <SEOFooter />
      <Footer />
    </>
  )
}
