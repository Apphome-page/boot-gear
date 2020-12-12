import { Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useUserData from '../../utils/useUserData'

import FAQ from '../../components/FAQ'

import WebsiteBuilder from '../../pageComponents/Website'
import { Hero } from '../../pageComponents/Website/style'

import faqList from '../../pageData/app-website-builder/faq.json'

export default function Website() {
  const { query: { edit: websiteKey = '' } = {} } = useRouter()

  const userData = useUserData()
  const userSites = Object.keys((userData && userData.sites) || {})

  const initTemplateProps =
    (websiteKey && userData && userData.sites && userData.sites[websiteKey]) ||
    {}

  return (
    <>
      <Head>
        <title>
          App Website Builder - Create beautiful, responsive and feature rich
          website for your mobile apps
        </title>
        <meta
          name='description'
          content='Smart App Website Builder - Create websites without learning web development and nuances of webhosting to create perfect websites for your apps.'
        />
        <meta
          property='og:title'
          content='App Website Builder - Create beautiful, responsive and feature rich website for your mobile apps'
        />
        <meta
          property='og:description'
          content='Smart App Website Builder - Create websites without learning web development and nuances of webhosting to create perfect websites for your apps.'
        />
      </Head>
      <div className='min-vh-100'>
        <Hero>
          <Container>
            <h1 className='display-4 py-5'>App website builder</h1>
            {websiteKey && userSites.includes(websiteKey) ? (
              <div className='lead border-bottom lead my-2'>
                Editing{' '}
                <a
                  href={`/${websiteKey}`}
                  className='text-decoration-none text-white-50'
                >
                  {websiteKey}
                </a>
              </div>
            ) : (
              ''
            )}
            <Row className='pt-3 pb-5'>
              <Col lg={6}>
                <WebsiteBuilder
                  className='ml-auto'
                  initProps={initTemplateProps}
                />
              </Col>
            </Row>
          </Container>
        </Hero>
        {faqList.length ? (
          <Container fluid className='py-5'>
            <FAQ faqList={faqList} />
          </Container>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
