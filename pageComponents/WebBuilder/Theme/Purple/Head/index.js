import { Fragment } from 'react'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import removeTags from '../../../../../utils/removeTags'

import styleHTML from './style.html'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

function HeadTitle() {
  const [{ isPreview }] = useContextStore()
  const [appTitleValue] = useWebBuilderContext('appTitle')
  if (isPreview) {
    return <></>
  }
  return <title>{removeTags(appTitleValue)}</title>
}

function HeadDescription() {
  const [{ isPreview }] = useContextStore()
  const [appDescriptionValue] = useWebBuilderContext('appDescription')
  if (isPreview) {
    return <></>
  }
  return <meta name='description' content={appDescriptionValue} />
}

function HeadGA() {
  const [{ isPreview }] = useContextStore()
  const [appGAValue] = useWebBuilderContext('appGA')
  if (isPreview || !appGAValue) {
    return <></>
  }
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${appGAValue}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${appGAValue}');
          `,
        }}
      />
    </>
  )
}

function HeadStyle() {
  return (
    <>
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css'
        integrity='sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l'
        crossOrigin='anonymous'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
        rel='stylesheet'
      />
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styleHTML }}
      />
    </>
  )
}

// TODO: Fix base
function HeadStatic() {
  const [{ isPreview }] = useContextStore()
  if (isPreview) {
    return <></>
  }
  return (
    <>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='preconnect' href={SITE_URL} />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
    </>
  )
}

export default function HeadComponent() {
  return (
    <>
      <HeadTitle />
      <HeadDescription />
      <HeadStatic />
      <HeadStyle />
      <HeadGA />
    </>
  )
}
