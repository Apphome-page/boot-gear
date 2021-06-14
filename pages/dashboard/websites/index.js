import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DashboardWebsite from '../../../pageComponents/Dashboard/website'
import DashboardDomain from '../../../pageComponents/Dashboard/domain'

import AuthWrapper from '../../../components/AuthWrapper'

export default function Websites() {
  const [showDomainModal, setDomainModal] = useState(false)
  const [domainWebKey, setDomainWebKey] = useState(null)

  const domainAction = useCallback((webKey) => {
    setDomainModal(true)
    setDomainWebKey(webKey)
  }, [])
  const domainActionClose = useCallback(() => {
    setDomainModal(false)
  }, [])

  return (
    <AuthWrapper placeholder={<Container className='min-vh-100' />}>
      <DashboardDomain
        show={showDomainModal}
        handleClose={domainActionClose}
        webKey={domainWebKey}
      />
      <Container fluid className='min-vh-100 pt-5 pb-3'>
        <Row>
          <Col lg={8} className=''>
            <DashboardWebsite domainAction={domainAction} />
          </Col>
          <Col lg={4} />
        </Row>
      </Container>
    </AuthWrapper>
  )
}
