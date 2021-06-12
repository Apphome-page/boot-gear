import classNames from 'classnames'

import Nav from './Nav'
import NavSeo from './Nav/Seo'
import NavPage from './Nav/Page'
import NavTheme from './Nav/Theme'
import Header from './Header'
import Footer from './Footer'

import styles from './styles.module.scss'

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
        <details open className='my-3'>
          <summary className='py-1 m-1 border-bottom'>Theme</summary>
          <section>
            <NavTheme />
          </section>
        </details>
        <details open className='my-3'>
          <summary className='py-1 m-1 border-bottom'>SEO Elements</summary>
          <section>
            <NavSeo />
          </section>
        </details>
        <details open className='my-3'>
          <summary className='py-1 m-1 border-bottom'>
            Supporting Content
          </summary>
          <section>
            <NavPage />
          </section>
        </details>
        <details open className='my-3'>
          <summary className='py-1 m-1 border-bottom'>Page Elements</summary>
          <section>
            <Nav />
          </section>
        </details>
      </div>
      <div className={styles.asideStuds}>
        <Footer />
      </div>
    </div>
  )
}
