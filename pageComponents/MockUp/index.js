import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  TabContainer,
  TabContent,
  TabPane,
} from 'react-bootstrap'

import Actions from './components/Actions'
import Assembly from './components/Assembly'
import Background from './components/Background'
import Caption from './components/Caption'
import Device from './components/Device'
import Model from './components/Model'
import Screenshot from './components/Screenshot'
import Template from './components/Template'

import MockProvider from './helpers/MockProvider'

export default function MockUp() {
  return (
    <MockProvider>
      <TabContainer defaultActiveKey='template'>
        <Container fluid>
          <Row className='mt-3'>
            <Col lg={9} />
            <Col lg={3}>
              <Actions />
            </Col>
          </Row>
          <Row className='p-2'>
            <Col lg={3}>
              <Row>
                <Col sm={3} className='p-0 border'>
                  <ListGroup variant='flush' className='small text-center'>
                    <ListGroupItem
                      action
                      eventKey='template'
                      variant='light'
                      className='p-1'
                    >
                      Template
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='background'
                      variant='light'
                      className='p-1'
                    >
                      Background
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='screenshot'
                      variant='light'
                      className='p-1'
                    >
                      Screenshot
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='device'
                      variant='light'
                      className='p-1'
                    >
                      Device
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='model'
                      variant='light'
                      className='p-1'
                    >
                      Model
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='caption'
                      variant='light'
                      className='p-1'
                    >
                      Caption
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col
                  sm={9}
                  className='border border-left-0 bg-light'
                  style={{ minHeight: '512px' }}
                >
                  <TabContent>
                    <TabPane eventKey='template'>
                      <Template />
                    </TabPane>
                    <TabPane eventKey='background'>
                      <Background />
                    </TabPane>
                    <TabPane eventKey='screenshot'>
                      <Screenshot />
                    </TabPane>
                    <TabPane eventKey='device'>
                      <Device />
                    </TabPane>
                    <TabPane eventKey='model'>
                      <Model />
                    </TabPane>
                    <TabPane eventKey='caption'>
                      <Caption />
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Col>
            <Col lg={9} className=''>
              <Assembly />
            </Col>
          </Row>
        </Container>
      </TabContainer>
    </MockProvider>
  )
}
