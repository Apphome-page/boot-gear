import {
  Container,
  Row,
  Col,
  TabContainer,
  Accordion,
  AccordionCollapse,
  AccordionToggle,
  Card,
} from 'react-bootstrap'

import Actions from './components/Actions'
import Assembly from './components/Assembly'
import Caption from './components/Caption'
import Design from './components/Design'
import Device from './components/Device'
// import Prefabs from './components/Prefabs'

import MockProvider from './helpers/MockProvider'

export default function MockUp() {
  return (
    <MockProvider>
      <TabContainer defaultActiveKey='design'>
        <Container fluid>
          <Row className='p-2'>
            <Col lg={3}>
              <Accordion defaultActiveKey='design'>
                {/* <Card>
                  <AccordionToggle as={Card.Header} eventKey='prefab' className='cursor-pointer'>
                    Prefabs
                  </AccordionToggle>
                  <AccordionCollapse eventKey='prefab'>
                    <Card.Body>
                      <Prefabs />
                    </Card.Body>
                  </AccordionCollapse>
                </Card> */}
                <Card>
                  <AccordionToggle
                    as={Card.Header}
                    eventKey='design'
                    className='cursor-pointer'
                  >
                    Design
                  </AccordionToggle>
                  <AccordionCollapse eventKey='design'>
                    <Card.Body>
                      <Design />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>

                <Card>
                  <AccordionToggle
                    as={Card.Header}
                    eventKey='device'
                    className='cursor-pointer'
                  >
                    Device
                  </AccordionToggle>
                  <AccordionCollapse eventKey='device'>
                    <Card.Body>
                      <Device />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card>
                  <AccordionToggle
                    as={Card.Header}
                    eventKey='caption'
                    className='cursor-pointer'
                  >
                    Caption
                  </AccordionToggle>
                  <AccordionCollapse eventKey='caption'>
                    <Card.Body>
                      <Caption />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card className='container'>
                  <Card.Body className='row'>
                    <Actions />
                  </Card.Body>
                </Card>
              </Accordion>
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
