import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEO() {
  const { pathname } = useRouter()
  return (
    <Head>
      <meta property='og:url' content={pathname} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='canonical' href={pathname} />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
      />
      <base href='/' target='_blank' />
    </Head>
  )
}
