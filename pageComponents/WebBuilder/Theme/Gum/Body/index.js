import Nav from './Nav'
import CTA from './CTA'
import Discover from './Discover'
import Banner from './Banner'
import Stats from './Stats'
import Video, { VideoScript } from './Video'
import Testimonials from './Testimonials'
import Contact from './Contact'
import About from './About'
import Address from './Address'
import Title from './Title'
import Description from './Description'

export default function BodyComponent() {
  return (
    <div className='gum-body'>
      <div id='main'>
        <Nav />
        <main className='container my-3 py-5'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='container py-5'>
                <div className='row my-5'>
                  <div className='col'>
                    <Title />
                    <Description />
                  </div>
                </div>
                <div className='row my-5 text-center'>
                  <div className='col-lg align-self-center'>
                    <CTA
                      keyName='appAndroid'
                      src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                      alt=''
                      height='80'
                    />
                  </div>
                  <div className='col-lg align-self-center'>
                    <CTA
                      keyName='appIos'
                      src='https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg'
                      alt=''
                      height='55'
                      className='col-lg align-self-center'
                    />
                  </div>
                </div>
                <Discover />
              </div>
            </div>
            <div className='col-lg-6'>
              <Banner />
            </div>
          </div>
        </main>
      </div>
      <div className='container py-5 text-center'>
        <div className='row'>
          <div className='col-lg-6 p-3'>
            <Stats keyName='appDownloads' />
          </div>
          <div className='col-lg-6 p-3'>
            <Stats keyName='appRatings' />
          </div>
        </div>
      </div>
      <Video />
      <Testimonials />
      <hr
        className='m-0 bg-light'
        style={{
          minHeight: '60px',
          borderRadius: '50% 50% 0% 0%',
        }}
      />
      <div className='bg-light'>
        <div className='container'>
          <div className='row pb-5'>
            <About />
            <Address />
            <div className='col-lg-3 my-1 py-1'>
              <h3>Contact Us</h3>
              <Contact keyName='appLinkedin'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-linkedin'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
                </svg>
              </Contact>
              <Contact keyName='appFacebook'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-facebook'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                </svg>
              </Contact>
              <Contact keyName='appDiscord'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-discord'
                  viewBox='0 0 16 16'
                >
                  <path d='M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z' />
                  <path d='M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z' />
                </svg>
              </Contact>
              <Contact keyName='appTwitter'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-twitter'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
                </svg>
              </Contact>
              <Contact keyName='appTwitch'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-twitch'
                  viewBox='0 0 16 16'
                >
                  <path d='M3.857 0L1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429l-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z' />
                  <path d='M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z' />
                </svg>
              </Contact>
              <Contact keyName='appWhatsapp'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-whatsapp'
                  viewBox='0 0 16 16'
                >
                  <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
                </svg>
              </Contact>
              <Contact keyName='appYoutube'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-youtube'
                  viewBox='0 0 16 16'
                >
                  <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.122C.002 7.343.01 6.6.064 5.78l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z' />
                </svg>
              </Contact>
              <Contact keyName='appInstagram'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-camera-fill'
                  viewBox='0 0 16 16'
                >
                  <path d='M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
                  <path d='M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z' />
                </svg>
              </Contact>
              <Contact keyName='appTelegram'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-telegram'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z' />
                </svg>
              </Contact>
              <Contact keyName='appPhone'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-telephone-fill'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
                  />
                </svg>
              </Contact>
              <Contact keyName='appMail'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-envelope-fill'
                  viewBox='0 0 16 16'
                >
                  <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z' />
                </svg>
              </Contact>
            </div>
          </div>
          <div className='row border-top pt-3 pb-5'>
            <div className='col-lg-8'>
              <span className='lead'>
                appLanding Theme by appLanding.page Team
              </span>
            </div>
            <div className='col-lg-4 py-3 text-right'>
              <span>All Right Reserved</span>
            </div>
          </div>
        </div>
      </div>
      <VideoScript />
    </div>
  )
}
