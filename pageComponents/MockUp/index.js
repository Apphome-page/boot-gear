import Head from 'next/head'
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
import Layout from './components/Layout'

import MockProvider from './helpers/MockProvider'

export default function MockUp({ preset }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins&display=swap'
          rel='stylesheet'
        />
      </Head>
      <MockProvider preset={preset}>
        <TabContainer defaultActiveKey='layout'>
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
                  <Col sm={3} className='p-0 border rounded-left'>
                    <ListGroup
                      variant='flush'
                      className='small mini text-center'
                    >
                      <ListGroupItem
                        action
                        eventKey='layout'
                        variant='light'
                        className='p-1'
                      >
                        <IconLayout
                          size='18'
                          className='d-block my-1 mx-auto'
                        />
                        Layout
                      </ListGroupItem>
                      <ListGroupItem
                        action
                        eventKey='caption'
                        variant='light'
                        className='p-1'
                      >
                        <IconCaption
                          size='18'
                          className='d-block my-1 mx-auto'
                        />
                        Caption
                      </ListGroupItem>
                      <ListGroupItem
                        action
                        eventKey='screenshot'
                        variant='light'
                        className='p-1'
                      >
                        <IconScreen
                          size='18'
                          className='d-block my-1 mx-auto'
                        />
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
                    </ListGroup>
                  </Col>
                  <Col
                    sm={9}
                    className='border border-left-0 rounded-right bg-light'
                  >
                    <TabContent>
                      <TabPane eventKey='layout'>
                        <Layout />
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
    </>
  )
}
