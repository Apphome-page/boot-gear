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
import IconCaption from '@svg-icons/bootstrap/chat-square-text.svg'
import IconLayout from '@svg-icons/bootstrap/columns.svg'
import IconBackground from '@svg-icons/bootstrap/collection.svg'
import IconScreen from '@svg-icons/bootstrap/fullscreen.svg'
import IconPhone from '@svg-icons/bootstrap/phone.svg'
import IconModel from '@svg-icons/bootstrap/music-player.svg'

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
      <div className='mock-container'>
        <MockProvider preset={preset}>
          <TabContainer defaultActiveKey='layout'>
            <Container fluid>
              <Row className='mt-3'>
                <Col lg={9} />
                <Col lg={3}>
                  <Actions />
                </Col>
              </Row>
              <Row>
                <Col lg={4} className='my-3'>
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
                            height='18'
                            width='18'
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
                            height='18'
                            width='18'
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
                            height='18'
                            width='18'
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
                          <IconPhone
                            height='18'
                            width='18'
                            className='d-block my-1 mx-auto'
                          />
                          Device
                        </ListGroupItem>
                        <ListGroupItem
                          action
                          eventKey='model'
                          variant='light'
                          className='p-1'
                        >
                          <IconModel
                            height='18'
                            width='18'
                            className='d-block my-1 mx-auto'
                          />
                          Model
                        </ListGroupItem>
                        <ListGroupItem
                          action
                          eventKey='background'
                          variant='light'
                          className='p-1'
                        >
                          <IconBackground
                            height='18'
                            width='18'
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
                <Col lg={8} className='my-3'>
                  <Assembly />
                </Col>
              </Row>
            </Container>
          </TabContainer>
        </MockProvider>
        <style jsx>
          {`
            .mock-container :global(.preview-container) {
              max-height: 369px;
              text-align: center;
              overflow-y: scroll;
            }
            .mock-container :global(.preview-button:after) {
              content: attr(data-name) '';
              display: block;
              width: 72px;
              color: #000000;
              font-size: 10px;
              overflow-wrap: break-word;
            }
            .mock-container :global(.preview-image) {
              margin: 4px;
              height: 65px;
              width: 65px;
              object-fit: contain;
              border-radius: 4px;
            }
          `}
        </style>
      </div>
    </>
  )
}
