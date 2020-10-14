import ColorPicker from 'rc-color-picker'
import {
  Row,
  Col,
  Tabs,
  Tab,
  FormFile,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import scrBg from '../../config/scrBg.json'
import scrMeta from '../../config/scrMeta.json'

import frameTemplates from '../../helpers/frameCanvas/templates'
import { defaultFrameId } from '../../helpers/frameCanvas/defaults'

import {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight,
} from './style'

export default function FrameTemplate() {
  return (
    <Row>
      <Col lg={3}>
        <Tabs defaultActiveKey='prefab' className='justify-content-around'>
          <Tab eventKey='prefab' title='Prefabs'>
            Prefabs
          </Tab>
          <Tab eventKey='design' title='Design'>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Template</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select' custom>
                {Object.keys(frameTemplates).map((fTemplate, fIndex) => (
                  <option value={fTemplate} key={fIndex}>
                    {frameTemplates[fTemplate].name}
                  </option>
                ))}
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Device</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select' custom defaultValue={defaultFrameId}>
                <optgroup label='Android'>
                  {scrMeta.android.map((phone, key) => (
                    <option key={key} data-type='android' value={phone.id}>
                      {phone.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label='iOS'>
                  {scrMeta.ios.map((phone, key) => (
                    <option key={key} data-type='ios' value={phone.id}>
                      {phone.name}
                    </option>
                  ))}
                </optgroup>
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <FormControl readOnly disabled value='Device Position' />
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Move Left</Tooltip>}>
                  <MoveLeft className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Move Up</Tooltip>}>
                  <MoveUp className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Move Down</Tooltip>}>
                  <MoveDown className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
                  <MoveRight className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='m-1'>
              <FormControl readOnly disabled value='Device Rotation' />
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Rotate Left</Tooltip>}>
                  <RotateLeft className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
              <InputGroup.Append>
                <OverlayTrigger overlay={<Tooltip>Rotate Right</Tooltip>}>
                  <RotateRight className='btn btn-outline-secondary' />
                </OverlayTrigger>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Background Template</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select'>
                <option value=''>None</option>
                {scrBg.map(({ path }, index) => (
                  <option value={path} key={index}>
                    {`Option ${index}`}
                  </option>
                ))}
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Background Color</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl readOnly aria-label='Background Color' />
              <InputGroup.Append>
                <ColorPicker
                  className='input-group-text p-0'
                  enableAlpha={false}
                >
                  <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                </ColorPicker>
              </InputGroup.Append>
            </InputGroup>
          </Tab>
          <Tab eventKey='caption' title='Caption'>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Caption</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as='textarea'
                aria-label='Caption'
                placeholder='Add Caption Here'
              />
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Font Size</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select' custom>
                <option value='18'>Small</option>
                <option value='24'>Medium</option>
                <option value='28'>Large</option>
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Font Family</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select' custom defaultValue='Arial'>
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Montserrat</option>
                <option>Poppins</option>
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Font Weight</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as='select' custom>
                <option value='400'>Light</option>
                <option value='600'>Normal</option>
                <option value='800'>Bold</option>
              </FormControl>
            </InputGroup>
            <InputGroup className='m-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Font Color</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl readOnly aria-label='Font Color' />
              <InputGroup.Append>
                <ColorPicker
                  className='input-group-text p-0'
                  enableAlpha={false}
                >
                  <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                </ColorPicker>
              </InputGroup.Append>
            </InputGroup>
          </Tab>
          <Tab eventKey='screenshot' title='Screenshot'>
            <FormFile
              id='scrFile'
              label='Upload a screenshot'
              accept='image/*'
              custom
            />
          </Tab>
        </Tabs>
      </Col>
      <Col lg={9}>
        <Row>
          <Col>{/* Preview Control */}</Col>
        </Row>
        <Row>
          <Col>{/* Previews */}</Col>
        </Row>
      </Col>
    </Row>
  )
}
