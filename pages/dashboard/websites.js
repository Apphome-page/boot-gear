import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DashboardWebsite from '../../pageComponents/Dashboard/website'
import DashboardDomain from '../../pageComponents/Dashboard/domain'
import DashboardProducts from '../../pageComponents/Dashboard/products'

import AuthWrapper from '../../components/AuthWrapper'
import { FAQList } from '../../components/FAQ'

import faqList from '../../pageData/dashboard/faq.json'

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
          <Col lg={4}>
            <DashboardProducts />
            <Container fluid>
              <Row className='my-4 p-2 border shadow-sm'>
                <Col>
                  <FAQList faqList={faqList} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </AuthWrapper>
  )
}
