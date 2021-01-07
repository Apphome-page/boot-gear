import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import DashboardProfile from '../../pageComponents/Dashboard/profile'
import DashboardSecurity from '../../pageComponents/Dashboard/security'
import DashboardWebsite from '../../pageComponents/Dashboard/website'

import AuthWrapper from '../../components/AuthWrapper'
import { FAQList } from '../../components/FAQ'

import faqList from '../../pageData/dashboard/faq.json'

export default function Dashboard() {
  return (
    <AuthWrapper>
      <Container fluid className='min-vh-100 pt-5 pb-3'>
        <Row>
          <Col lg={8} className=''>
            <DashboardProfile />
            <DashboardSecurity />
            <DashboardWebsite />
          </Col>
          <Col lg={4}>
            <Container fluid>
              <Row className='my-4 p-2 border shadow-sm'>
                <Col lg={8}>
                  <div className='pb-2 lead font-weight-bold'>
                    App Store Screenshots
                  </div>
                  <div className='mini'>
                    Generate beautiful screenshots in minutes
                  </div>
                </Col>
                <Col lg={4} className='align-self-center text-right'>
                  <Link href='/app-screenshot-generator'>Create for FREE</Link>
                </Col>
              </Row>
              <Row className='my-4 p-2 border shadow-sm'>
                <Col lg={8}>
                  <div className='pb-2 lead font-weight-bold'>
                    App Store Icons
                  </div>
                  <div className='mini'>
                    Generate responsive app icons for app store in minutes
                  </div>
                </Col>
                <Col lg={4} className='align-self-center text-right'>
                  <Link href='/app-icon-generator'>Create for FREE</Link>
                </Col>
              </Row>
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
