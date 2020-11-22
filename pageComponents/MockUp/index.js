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
import { ChatSquareText as IconCaption } from '@emotion-icons/bootstrap/ChatSquareText'
import { Columns as IconLayout } from '@emotion-icons/bootstrap/Columns'
import { Collection as IconBackground } from '@emotion-icons/bootstrap/Collection'
import { Fullscreen as IconScreen } from '@emotion-icons/bootstrap/Fullscreen'
import { Phone as IconPhone } from '@emotion-icons/bootstrap/Phone'
import { MusicPlayer as IconModel } from '@emotion-icons/bootstrap/MusicPlayer'

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
            <Col lg={4}>
              <Row className='h-100'>
                <Col sm={3} className='p-0 border'>
                  <ListGroup variant='flush' className='small mini text-center'>
                    <ListGroupItem
                      action
                      eventKey='template'
                      variant='light'
                      className='p-1'
                    >
                      <IconLayout size='18' className='d-block my-1 mx-auto' />
                      Template
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='background'
                      variant='light'
                      className='p-1'
                    >
                      <IconBackground
                        size='18'
                        className='d-block my-1 mx-auto'
                      />
                      Background
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='screenshot'
                      variant='light'
                      className='p-1'
                    >
                      <IconScreen size='18' className='d-block my-1 mx-auto' />
                      Screenshot
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='device'
                      variant='light'
                      className='p-1'
                    >
                      <IconPhone size='18' className='d-block my-1 mx-auto' />
                      Device
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='model'
                      variant='light'
                      className='p-1'
                    >
                      <IconModel size='18' className='d-block my-1 mx-auto' />
                      Model
                    </ListGroupItem>
                    <ListGroupItem
                      action
                      eventKey='caption'
                      variant='light'
                      className='p-1'
                    >
                      <IconCaption size='18' className='d-block my-1 mx-auto' />
                      Caption
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col sm={9} className='border border-left-0 bg-light'>
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
            <Col lg={8} className=''>
              <Assembly />
            </Col>
          </Row>
        </Container>
      </TabContainer>
    </MockProvider>
  )
}
