import { Button, Container, Row, Col } from 'react-bootstrap'
import { Code as LoaderCode } from 'react-content-loader'
import noop from 'lodash/noop'

import Link from '../../../components/Tag/Link'
import { useUserData } from '../../../components/Context/Login'

import WebsiteDetails from './details'
import WebsiteActions from './actions'

function WebsitePlaceholder() {
  return (
    <>
      <Row className='py-3'>
        <Col>
          <LoaderCode />
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          <LoaderCode />
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          <LoaderCode />
        </Col>
      </Row>
    </>
  )
}

export default function Website({ domainAction = noop }) {
  const [userData, firstLaunch] = useUserData()
  const userSites = Object.keys((userData && userData.sites) || {})

  return (
    <>
      <div className='lead text-dark my-1 pb-1 border-bottom'>
        Your Websites
      </div>
      <Container className='mb-5'>
        {firstLaunch ? (
          userSites.map((webKey, webIndex) => {
            const webData = userData.sites[webKey]
            const { webDomain, webHost } = webData

            let webActionText = 'Add Custom Domain'
            let webLink = `/${webKey}/`
            if (webDomain && !webHost) {
              webActionText = 'Verify Domain'
            } else if (webDomain && webHost) {
              webActionText = 'View Nameservers'
              webLink = webDomain.replace(/^(?:(?:f|ht)tps?:\/\/)?/, 'https://')
            }

            return (
              <Row key={webIndex} className='py-3 border shadow-sm'>
                <Col lg={8}>
                  <WebsiteDetails
                    webKey={webKey}
                    webLink={webLink}
                    webData={webData}
                  />
                </Col>
                <Col lg={4}>
                  <WebsiteActions
                    webKey={webKey}
                    webAction={() => domainAction(webKey)}
                    webActionText={webActionText}
                  />
                </Col>
              </Row>
            )
          })
        ) : (
          <WebsitePlaceholder />
        )}
        <Row className='my-1'>
          <Col className='text-center'>
            <Link href='/app-website-builder'>
              <Button variant='alt'>Create a new website for your App!</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
