import { Container, Row, Col } from 'react-bootstrap'
import DashboardSubscriptions from '../../pageComponents/Dashboard/subscriptions'
import DashboardProducts from '../../pageComponents/Dashboard/products'

import AuthWrapper from '../../components/AuthWrapper'
import { FAQList } from '../../components/FAQ'

import faqList from '../../pageData/dashboard/faq.json'

export default function Subscriptions() {
  return (
    <AuthWrapper placeholder={<Container className='min-vh-100' />}>
      <Container fluid className='min-vh-100 pt-5 pb-3'>
        <Row>
          <Col lg={8} className=''>
            <DashboardSubscriptions />
          </Col>
          <Col lg={4}>
            <DashboardProducts />
            <Container fluid>
              <Row className='my-3 p-3 border shadow-sm'>
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
