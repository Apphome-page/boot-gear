import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import Head from 'next/head'

const BASE_URI = process.env.NEXT_PUBLIC_SITE_URL
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const AMP_GA_JSON = JSON.stringify({
  vars: {
    gtag_id: GA_TRACKING_ID,
    config: {
      [GA_TRACKING_ID]: { groups: 'default' },
    },
  },
})

export default function SEO() {
  const isAmp = useAmp()
  const router = useRouter()
  const { pathname } = router

  const trackRouteChange = useCallback((urlPath) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: urlPath,
    })
  }, [])

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args) => {
      window.dataLayer.push(...args)
    }
    if (!window.GTAG_LOADED_ONCE_FLAG) {
      window.GTAG_LOADED_ONCE_FLAG = true
      window.gtag('js', new Date())
      window.gtag('config', `${GA_TRACKING_ID}`, {
        page_path: window.location.pathname,
      })
    }
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', trackRouteChange)
    return () => {
      router.events.off('routeChangeComplete', trackRouteChange)
    }
  }, [router.events, trackRouteChange])

  return (
    <>
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
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <base
              href={BASE_URI.endsWith('/') || `${BASE_URI}/`}
              target='_blank'
            />
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
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
      {isAmp ? (
        <amp-analytics type='gtag' data-credentials='include'>
          <script
            type='application/json'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: AMP_GA_JSON }}
          />
        </amp-analytics>
      ) : (
        ''
      )}
    </>
  )
}
