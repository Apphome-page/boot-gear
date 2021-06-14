import { Container, Row, Col } from 'react-bootstrap'
import DashboardSubscriptions from '../../../pageComponents/Dashboard/subscription'

import { OrderedPricing } from '../../../pageComponents/Home/pricing'

import AuthWrapper from '../../../components/AuthWrapper'
import { useUserData } from '../../../components/Context/Login'

export default function Subscriptions() {
  const [userData] = useUserData()
  const planOrder = (userData && userData.plan && userData.plan.order) || 0
  return (
    <AuthWrapper placeholder={<Container className='min-vh-100' />}>
      <Container fluid className='min-vh-100 pt-5 pb-3'>
        <Row>
          <Col lg={8} className=''>
            <DashboardSubscriptions />
            <div className='mt-5 pt-3 border-top lead text-center bg-light'>
              Upgrade Your plan
            </div>
            <OrderedPricing
              planOrder={planOrder}
              className='m-0 p-3 bg-light'
            />
          </Col>
          <Col lg={4} />
        </Row>
      </Container>
    </AuthWrapper>
  )
}
