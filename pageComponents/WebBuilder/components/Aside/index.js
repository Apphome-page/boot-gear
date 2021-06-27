import { useState, useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import classNames from 'classnames'

import TextEditor from '../Editor/Text'

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
  const [{ keyName, placeholderText, title, show }, setPopProps] = useState({
    show: false,
  })

  const showAction = useCallback((popData) => {
    setPopProps({ ...popData, show: true })
  }, [])

  const hideAction = useCallback(() => {
    setPopProps({
      show: false,
    })
  }, [])

  return (
    <>
      {renderProps.map(
        ([asideKey, asideTitle, asideDescription], asideIndex) => (
          <NavPage
            key={asideIndex}
            keyName={asideKey}
            keyTitle={asideTitle}
            keyDesc={asideDescription}
            keyAction={showAction}
          />
        )
      )}
      <Modal show={show} onHide={hideAction} backdrop size='lg'>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body className='m-3 p-3 border'>
          <TextEditor keyName={keyName} placeholderText={placeholderText} />
        </Modal.Body>
        <Modal.Footer className='justify-content-start mini text-warning'>
          * Content is saved as you edit
        </Modal.Footer>
      </Modal>
    </>
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
