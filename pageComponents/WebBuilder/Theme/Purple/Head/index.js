/* eslint-disable react/no-danger */
/* eslint-disable no-useless-escape */
import { memo, useEffect } from 'react'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import removeTags from '../../../../../utils/removeTags'

import styleHTML from './style.html'
import scriptHTML from './script.html'

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
        href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
        rel='stylesheet'
      />
      <style dangerouslySetInnerHTML={{ __html: styleHTML }} />
    </>
  )
}

function HeadFramework() {
  const [{ isPreview }] = useContextStore()
  if (isPreview) {
    return <></>
  }
  return (
    <>
      <script
        src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
        integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
        crossOrigin='anonymous'
      />
      <script
        src='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns'
        crossOrigin='anonymous'
      />
    </>
  )
}

function RawHeadScript() {
  const [{ isPreview }] = useContextStore()
  useEffect(() => {
    try {
      if (isPreview) {
        // eslint-disable-next-line no-eval
        eval(scriptHTML)
      }
    } catch (error) {
      //
    }
  }, [isPreview])
  if (isPreview) {
    return <></>
  }
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: scriptHTML,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            var webBase = window.location.href.replace(/\\/*$/,'/');
            var webBaseTag = document.getElementById('web-base');
            if(webBaseTag) {
              webBase.href = webBase;
            } else {
              var webBaseElement = document.createElement('base');
              webBaseElement.id = 'web-base';
              webBaseElement.href = webBase;
              document.head.appendChild(webBaseElement);
            }
          })()
        `,
        }}
      />
    </>
  )
}
const HeadScript = memo(RawHeadScript)

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
      <HeadFramework />
      <HeadScript />
      <HeadGA />
    </>
  )
}
