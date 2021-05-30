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
--color-uno: #190a32;
--color-dos: #3d1e82;
--color-tres: #6541c1;
/* word-break: break-all; */
}
.gum-body * {
font-family: 'Poppins', sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
font-smoothing: antialiased;
}
.gum-body ul,
.gum-body ol {
list-style-position: inside;
}
.gum-body blockquote,
.gum-body cite {
display: inline-block;
vertical-align: top;
}
.gum-body #main {
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg width='80' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient y2='.5' x2='.8' y1='.8' x1='0' id='b'%3E%3Cstop offset='0' stop-color='%23724fc7'/%3E%3Cstop offset='1' stop-color='%23d4319a'/%3E%3C/linearGradient%3E%3Cfilter height='200%25' width='200%25' y='-50%25' x='-50%25' id='a'%3E%3CfeGaussianBlur in='SourceGraphic'/%3E%3C/filter%3E%3C/defs%3E%3Cpath fill='%23fff' d='M-1-1h82v62H-1z'/%3E%3Cg%3E%3Ccircle stroke='null' filter='url(%23a)' cy='10' cx='63' stroke-opacity='null' stroke-width='1.5' fill='url(%23b)' r='28'/%3E%3Ccircle stroke='null' cy='11.1' cx='49.1' fill-opacity='.1' stroke-opacity='null' stroke-width='1.5' fill='%23fff' r='16.3'/%3E%3Ccircle stroke='null' cy='34' cx='71.9' fill-opacity='.1' stroke-opacity='null' stroke-width='1.5' fill='%23fff' r='10.9'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
.gum-body .bg-uno {
  background-color: var(--color-uno);
}
.gum-body .bg-dos {
  background-color: var(--color-dos);
}
.gum-body .bg-tres {
  background-color: var(--color-tres);
}
.gum-body .btn {
border: 0;
outline: 0;
font-size: 15px;
border-radius: 18px;
display: inline-block;
padding: 4.5px 21.5px;
}
.gum-body .btn-light {
background: #fff;
color: var(--color-uno);
}
.gum-body .btn-alt {
position: relative;
display: inline-block;
border: 0;
outline: 0;
background: var(--color-tres);
background: linear-gradient(to right, var(--color-tres) 0, #d43396 98%, #d43396 100%);
color: #fff;
font-size: 16px;
font-weight: 600;
border-radius: 28px;
padding: 15px 29px;
box-shadow: 0 15px 30px rgb(212 50 151 / 27%);
}
.gum-body .btn-alt2 {
position: relative;
display: inline-block;
border: 0;
outline: 0;
background: var(--color-tres);
background: linear-gradient(to right, var(--color-tres) 0, #d43396 98%, #d43396 100%);
color: var(--color-uno);
font-size: 16px;
font-weight: 600;
transition: all 0.4s ease;
border-radius: 28px;
padding: 15px 29px;
}
.gum-body .btn-alt2 > span {
position: relative;
}
.gum-body .btn-alt2::before {
content: '';
position: absolute;
top: 2px;
left: 2px;
right: 2px;
bottom: 2px;
border-radius: 28px;
background: #fff;
opacity: 1;
transition: all 0.4s ease;
}
.gum-body .btn-alt2:hover {
color: #ffffff;
}
.gum-body .btn-alt2:hover::before {
opacity: 0;
}
.gum-body .parallax {
position: relative;
background-attachment: fixed;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
}
.gum-body .parallax > * {
position: relative;
}
.gum-body .parallax::before {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(61, 30, 130, 0.67);
}
.gum-body .count {
color: #d43396;
}
@keyframes blimp {
0% {
transform: scale(1);
}
100% {
transform: scale(1.3);
}
}
.gum-body .play {
height: 120px;
width: 120px;
border-radius: 50%;
color: #d9378b;
background-color: white;
animation: blimp 0.6s ease-in-out 0s infinite alternate;
box-shadow: 0px 0px 8px 16px rgba(255, 255, 255, 0.4);
cursor: pointer;
}
.gum-body .icon {
display: inline-block;
height: 24px;
width: 24px;
color: coral;
cursor: pointer;
transition: all 0.3s ease-in-out;
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
