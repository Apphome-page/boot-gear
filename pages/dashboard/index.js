import { Container, Row, Col } from 'react-bootstrap'
import DashboardProfile from '../../pageComponents/Dashboard/profile'
import DashboardSecurity from '../../pageComponents/Dashboard/security'

import AuthWrapper from '../../components/AuthWrapper'

export default function Dashboard() {
  return (
    <AuthWrapper placeholder={<Container className='min-vh-100' />}>
      <Container fluid className='min-vh-100 pt-5 pb-3'>
        <Row>
          <Col lg={8} className=''>
            <DashboardProfile />
            <DashboardSecurity />
          </Col>
          <Col lg={4} />
        </Row>
      </Container>
    </AuthWrapper>
  )
}
