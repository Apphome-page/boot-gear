/* eslint-disable no-alert */
import { Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'

import useUserData from '../../utils/useUserData'

import { Hero, WebsiteBuilder } from '../../styles/pages/appwebsite'

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
        <title>App Website Home Page Generator</title>
      </Head>
      <Hero>
        <Container>
          <h1 className='display-4 py-5'>App Website Generator</h1>
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
        </Container>
        <Container fluid className='pt-2 pb-5'>
          <Row>
            <Col lg={6}>
              <WebsiteBuilder
                className='ml-auto'
                initProps={initTemplateProps}
              />
            </Col>
            <Col lg={6} className='align-self-end d-lg-block d-none'>
              <img
                src='/img/hero/hero-template.png'
                alt='Hero Template'
                className='w-100'
              />
            </Col>
          </Row>
        </Container>
      </Hero>

      <hr />
    </>
  )
}
