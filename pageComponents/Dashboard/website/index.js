import { Button, Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

import useUserData from '../../../utils/useUserData'

import WebsiteDetails from './details'
import WebsiteActions from './actions'

export default function Website({ domainAction = () => {} }) {
  const userData = useUserData()
  const userSites = Object.keys((userData && userData.sites) || {})

  return (
    <>
      <div className='lead text-dark my-2 pb-1 border-bottom'>
        Your Websites
      </div>
      <Container className='mb-5'>
        {userSites.map((webKey, webIndex) => {
          const webData = userData.sites[webKey]
          const { webDomain, webHost } = webData

          let webActionText = 'Add Custom Domain'
          let webLink = `/${webKey}/`
          if (webDomain && !webHost) {
            webActionText = 'Verify Domain'
          } else if (webDomain && webHost) {
            webActionText = 'View Nameservers'
            webLink = webDomain
          }

          return (
            <Row key={webIndex} className='py-2 border shadow-sm'>
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
        })}
        <Row className='my-2'>
          <Col className='text-center'>
            <Link href='/app-website-builder'>
              <Button variant='light' className='btn-alt'>
                Create a new website for your App!
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
