import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'

const BASE_URI = process.env.NEXT_PUBLIC_SITE_URL

export default function SEO() {
  const { pathname } = useRouter()
  const isAmp = useAmp()
  return (
    <Head>
      <meta property='og:url' content={pathname} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='' />
      <meta charSet='utf-8' />
      {/* TODO: PUT BASE AT TOP */}
      {isAmp ? (
        ''
      ) : (
        <>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <base
            href={BASE_URI.endsWith('/') || `${BASE_URI}/`}
            target='_blank'
          />
        </>
      )}
      <link rel='canonical' href={`${BASE_URI}${pathname}`} />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
    </Head>
  )
}
