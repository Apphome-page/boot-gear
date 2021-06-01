import Head from 'next/head'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import removeTags from '../../../../../utils/removeTags'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

function EmptyHead({ children }) {
  return <>{children}</>
}

function HeadWrapper({ children }) {
  const { isPreview } = useContextStore()
  const WrapperComponent = isPreview ? Head : EmptyHead
  return <WrapperComponent>{children}</WrapperComponent>
}

function HeadTitle() {
  const [appTitleValue] = useWebBuilderContext('appTitle')
  return (
    <HeadWrapper>
      <title>{removeTags(appTitleValue)}</title>
    </HeadWrapper>
  )
}

function HeadDescription() {
  const [appDescriptionValue] = useWebBuilderContext('appDescription')
  return (
    <HeadWrapper>
      <meta name='description' content={appDescriptionValue} />
    </HeadWrapper>
  )
}

function HeadStyles() {
  return (
    <HeadWrapper>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
body {
margin: 0px;
padding: 0px;
/* word-break: break-all; */
}
.purple-body * {
font-family: 'Poppins', sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
font-smoothing: antialiased;
}
`,
        }}
      />
    </HeadWrapper>
  )
}

// TODO: Fix base
function HeadStatic() {
  return (
    <HeadWrapper>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <base target='_blank' />
      <link rel='preconnect' href={SITE_URL} />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
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
    </HeadWrapper>
  )
}

export default function HeadComponent() {
  return (
    <>
      <HeadTitle />
      <HeadDescription />
      <HeadStatic />
      <HeadStyles />
    </>
  )
}
