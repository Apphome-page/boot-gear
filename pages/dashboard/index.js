import {
  Container,
  Row,
  Col,
  TabContainer,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import DashboardProfile from '../../pageComponents/Dashboard/profile'
import DashboardSecurity from '../../pageComponents/Dashboard/security'
import DashboardWebsite from '../../pageComponents/Dashboard/website'

import AuthWrapper from '../../components/AuthWrapper'

export default function Dashboard() {
  return (
    <Container className='min-vh-100 my-5'>
      <AuthWrapper>
        <TabContainer defaultActiveKey='profile'>
          <Row className='p-2'>
            <Col lg={3}>
              <ListGroup>
                <ListGroupItem variant='light' action eventKey='profile'>
                  Profile
                </ListGroupItem>
                <ListGroupItem variant='light' action eventKey='security'>
                  Security
                </ListGroupItem>
                <ListGroupItem variant='light' action eventKey='website'>
                  Websites
                </ListGroupItem>
              </ListGroup>
              <hr className='d-block d-lg-none' />
            </Col>
            <Col lg={9} className=''>
              <TabContent>
                <TabPane eventKey='profile'>
                  <DashboardProfile />
                </TabPane>
                <TabPane eventKey='security'>
                  <DashboardSecurity />
                </TabPane>
                <TabPane eventKey='website'>
                  <DashboardWebsite />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </AuthWrapper>
    </Container>
  )
}
