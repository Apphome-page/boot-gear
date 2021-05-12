import { useRouter } from 'next/router'

import Header from '../Header'
import Footer from '../Footer'
import SEOFooter from '../SEOFooter'

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
      <Header />
      {children}
      <SEOFooter />
      <Footer />
    </>
  )
}
