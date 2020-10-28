import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEO() {
  const { pathname } = useRouter()
  return (
    <Head>
      <meta property='og:url' content={pathname} />
      <meta property='og:type' content='website' />
      <meta
        property='og:image'
        content={`https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_storageBucket}/o/logo-apphome.png?alt=media`}
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='canonical' href={pathname} />
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
      <base href='/' target='_blank' />
    </Head>
  )
}
