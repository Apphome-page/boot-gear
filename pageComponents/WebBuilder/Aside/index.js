import classNames from 'classnames'

import Nav from './Nav'
import NavSection from './NavSection'
import NavSeo from './NavSeo'
import Header from './Header'
import Footer from './Footer'

import styles from './styles.module.scss'

const webBuilderSeoKeys = [['appGA', 'GA Key', 'Google Analytics Tracking Id']]

const webBuilderAtomKeys = [
  // [container-key, Text, Description, onlyNavigate]
  ['appIcon', 'Icon', 'Icon of your App'],
  ['appTitle', 'Title', 'Title of your App'],
  ['appDescription', 'Description', 'Description of your App'],
  ['appBanner', 'Banner Image', 'Iconic Image in First-Fold'],
  [
    'store',
    'Store Links',
    'Store Links of your App',
    ['appLinkAndroid', 'appLinkApple'],
  ],
  [
    'metric',
    'Metrics',
    'Store Metrics of your App',
    ['appMetricRatings', 'appMetricDownloads'],
  ],
  [
    'feature',
    'Features',
    'Features of your App',
    ['appFeature-1', 'appFeature-2', 'appFeature-3', 'appFeature-4'],
  ],
  [
    'screenshot',
    'Screenshots',
    'Screenshots of your App',
    ['appScreenshot-1', 'appScreenshot-2'],
  ],
  ['appVideo', 'App Video', 'Supporting Youtube Video for your App'],
  [
    'testimonials',
    'Testimonials',
    'Testimonial for your App',
    [
      'appTestimonial-1-text',
      'appTestimonial-2-text',
      'appTestimonial-3-text',
      'appTestimonial-4-text',
    ],
  ],
  ['appAbout', 'About', 'About the Developer'],
  ['appAddress', 'Address', 'Developer Address'],
  [
    'contact',
    'Contact Info',
    'Developer Contact Information',
    [
      'appLinkPhone',
      'appLinkMail',
      'appLinkFacebook',
      'appLinkInstagram',
      'appLinkLinkedin',
      'appLinkDiscord',
      'appLinkTwitch',
      'appLinkTwitter',
      'appLinkWhatsapp',
      'appLinkTelegram',
      'appLinkYoutube',
    ],
  ],
]

export default function Aside() {
  return (
    <div
      className={classNames(
        'bg-dark',
        'text-white',
        'shadow-lg',
        styles.asideWrap
      )}
    >
      <div
        className={classNames(
          'w-100',
          'lead',
          'bg-alt',
          'text-center',
          styles.asideHead
        )}
      >
        <Header />
      </div>
      <div className={classNames('p-1', styles.asideKnobs)}>
        <div className='mt-3 mb-1 border-bottom'>SEO Elements</div>
        {webBuilderSeoKeys.map(([atomKey, atomTitle, atomDesc]) => (
          <NavSeo
            key={atomKey}
            keyName={atomKey}
            keyTitle={atomTitle}
            keyDesc={atomDesc}
          />
        ))}
        <div className='mt-3 mb-1 border-bottom'>Page Elements</div>
        {webBuilderAtomKeys.map(
          ([atomKey, atomTitle, atomDesc, atomSections]) => {
            const AtomContainer = atomSections ? NavSection : Nav
            return (
              <AtomContainer
                key={atomKey}
                keyName={atomKey}
                keyTitle={atomTitle}
                keyDesc={atomDesc}
                keySections={atomSections}
              />
            )
          }
        )}
      </div>
      <div className={styles.asideStuds}>
        <Footer />
      </div>
    </div>
  )
}
