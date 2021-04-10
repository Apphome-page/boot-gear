import { Container } from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUserData } from '../../components/LoginPop'
import FAQ from '../../components/FAQ'

import WebsiteBuilder from '../../pageComponents/Website'

import faqList from '../../pageData/app-website-builder/faq.json'

export default function Website() {
  const { query: { webEdit = '' } = {} } = useRouter()

  const userData = useUserData()
  const userSites = Object.keys((userData && userData.sites) || {})

  const initTemplateProps =
    (webEdit && userData && userData.sites && userData.sites[webEdit]) || {}

  return (
    <>
      <Head>
        <title>
          App Website Builder - Create beautiful, responsive and feature rich
          website for your mobile apps
        </title>
        <meta
          name='description'
          content='Smart App Website Builder - Create app landing pages without learning web development and nuances of webhosting to create perfect landing pages for your apps.'
        />
        <meta
          property='og:title'
          content='App Website Builder - Create beautiful, responsive and feature rich app landing pages for your mobile apps'
        />
        <meta
          property='og:description'
          content='Smart App Website Builder - Create websites without learning web development and nuances of webhosting to create perfect app landing pages for your apps.'
        />
      </Head>
      <section className='hero min-vh-100 pt-3 pb-5'>
        <Container>
          <h1 className='display-4 py-3'>App website builder</h1>
          {webEdit && userSites.includes(webEdit) ? (
            <div className='lead border-bottom lead my-1'>
              Editing{' '}
              <a
                href={`/${webEdit}`}
                className='text-decoration-none text-white-50'
              >
                {webEdit}
              </a>
            </div>
          ) : (
            ''
          )}
        </Container>
        <WebsiteBuilder className='ml-auto' initProps={initTemplateProps} />
      </section>
      {faqList.length ? (
        <Container fluid className='py-5'>
          <FAQ faqList={faqList} />
        </Container>
      ) : (
        ''
      )}
    </>
  )
}
