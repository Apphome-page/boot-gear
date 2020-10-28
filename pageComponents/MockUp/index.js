import {
  Container,
  Row,
  Col,
  TabContainer,
  Accordion,
  AccordionCollapse,
  AccordionToggle,
  Card,
  Button,
} from 'react-bootstrap'

import Assembly from './components/Assembly'
import Caption from './components/Caption'
import Design from './components/Design'
import Device from './components/Device'
import Screenshot from './components/Screenshot'
import Prefabs from './components/Prefabs'

import MockProvider from './helpers/MockProvider'

export default function MockUp() {
  return (
    <MockProvider>
      <TabContainer defaultActiveKey='design'>
        <Container fluid>
          <Row className='p-2'>
            <Col lg={3}>
              <Accordion defaultActiveKey='design'>
                <Card>
                  <AccordionToggle as={Card.Header} eventKey='prefab'>
                    Prefabs
                  </AccordionToggle>
                  <AccordionCollapse eventKey='prefab'>
                    <Card.Body>
                      <Prefabs />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card>
                  <AccordionToggle as={Card.Header} eventKey='design'>
                    Design
                  </AccordionToggle>
                  <AccordionCollapse eventKey='design'>
                    <Card.Body>
                      <Design />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>

                <Card>
                  <AccordionToggle as={Card.Header} eventKey='device'>
                    Device
                  </AccordionToggle>
                  <AccordionCollapse eventKey='device'>
                    <Card.Body>
                      <Device />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card>
                  <AccordionToggle as={Card.Header} eventKey='caption'>
                    Caption
                  </AccordionToggle>
                  <AccordionCollapse eventKey='caption'>
                    <Card.Body>
                      <Caption />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card>
                  <AccordionToggle as={Card.Header} eventKey='screenshot'>
                    Screenshot
                  </AccordionToggle>
                  <AccordionCollapse eventKey='screenshot'>
                    <Card.Body>
                      <Screenshot />
                    </Card.Body>
                  </AccordionCollapse>
                </Card>
                <Card>
                  <Card.Body className='row'>
                    <Button variant='info' className='col'>
                      Reset
                    </Button>
                    <Button variant='success' className='col'>
                      Save
                    </Button>
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
