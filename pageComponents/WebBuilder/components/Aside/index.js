import classNames from 'classnames'

import NavItem from './Nav/Item'
import NavSection from './Nav/Section'
import NavSeo from './Nav/Seo'
import NavPage from './Nav/Page'
import NavTheme from './Nav/Theme'
import Header from './Header'
import Footer from './Footer'

import styles from './styles.module.scss'

function AsideNavBuilder({ renderProps = [] }) {
  return renderProps.map(
    ([asideKey, asideTitle, asideDescription, asideSections], asideIndex) => {
      const AsideComponent = asideSections ? NavSection : NavItem
      return (
        <AsideComponent
          key={asideIndex}
          keyName={asideKey}
          keyTitle={asideTitle}
          keyDesc={asideDescription}
          keySections={asideSections}
        />
      )
    }
  )
}

function AsideNavPage({ renderProps = [] }) {
  return renderProps.map(
    ([asideKey, asideTitle, asideDescription], asideIndex) => (
      <NavPage
        key={asideIndex}
        keyName={asideKey}
        keyTitle={asideTitle}
        keyDesc={asideDescription}
      />
    )
  )
}

function AsideNavSeo({ renderProps = [] }) {
  return renderProps.map(
    ([asideKey, asideTitle, asideDescription], asideIndex) => (
      <NavSeo
        key={asideIndex}
        keyName={asideKey}
        keyTitle={asideTitle}
        keyDesc={asideDescription}
      />
    )
  )
}

function AsideNav({ renderProps = [] }) {
  return renderProps.map(
    (
      {
        title: asideSectionTitle,
        type: asideSectionType,
        data: asideSectionData,
      },
      asideSectionIndex
    ) => {
      let AsideSection = null
      switch (asideSectionType) {
        case 'builder':
          AsideSection = AsideNavBuilder
          break
        case 'page':
          AsideSection = AsideNavPage
          break
        case 'seo':
          AsideSection = AsideNavSeo
          break
        default:
          break
      }

      if (!AsideSection) {
        return <></>
      }

      return (
        <details key={asideSectionIndex} open className='my-3'>
          <summary className='py-1 m-1 border-bottom'>
            {asideSectionTitle}
          </summary>
          <section>
            <AsideSection renderProps={asideSectionData} />
          </section>
        </details>
      )
    }
  )
}

export default function Aside({ renderProps }) {
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
        <AsideNav renderProps={renderProps} />
      </div>
      <div className={styles.asideStuds}>
        <Footer />
      </div>
    </div>
  )
}
