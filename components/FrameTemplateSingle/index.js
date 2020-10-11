import { useRef, useState, useCallback } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  FormFile,
  Jumbotron,
} from 'react-bootstrap'
import ColorPicker from 'rc-color-picker'
import { saveAs } from 'file-saver'

import scrBg from '../../config/scrBg.json'
import scrMeta from '../../config/scrMeta.json'

import frameTemplates from '../../helpers/frameCanvas/templates'
import frameRender from '../../helpers/frameCanvas/render'
import {
  defaultProps as frameDefaultProps,
  defaultFrameId,
  getFrameProps,
} from '../../helpers/frameCanvas/defaults'

import FrameCanvas from '../FrameCanvas'

const maxHeight = 512
const frameDefaults = frameDefaultProps(maxHeight)

export default function FrameTemplateSingle() {
  const canvasRef = useRef(null)
  const [frameCanvasProps, updateFrameCanvasProps] = useState({
    ...frameDefaults,
  })

  const modFrameCanvasProps = useCallback((deltaProps) => {
    updateFrameCanvasProps((prevFrameCanvasProps) => {
      const newProps = {
        ...prevFrameCanvasProps,
        ...deltaProps,
      }
      // if (newProps.template === 'none') {
      //   newProps.heading = ''
      // }
      return frameTemplates[newProps.template].adjustProps(newProps)
    })
  }, [])

  const eventTemplate = useCallback(
    (e) => {
      const { frameType, frameId } = frameCanvasProps
      modFrameCanvasProps({
        ...getFrameProps(frameType, frameId, { maxHeight }),
        template: e.target.value,
      })
    },
    [frameCanvasProps, modFrameCanvasProps]
  )

  const eventFrame = useCallback(
    (e) => {
      modFrameCanvasProps(
        getFrameProps(
          e.target.options[e.target.selectedIndex].dataset.type || 'android',
          e.target.value,
          { maxHeight }
        )
      )
    },
    [modFrameCanvasProps]
  )

  const eventSave = useCallback(() => {
    const { frameId, frameType } = frameCanvasProps
    const fullFrameProps = {
      ...frameCanvasProps,
      ...getFrameProps(frameType, frameId),
    }
    fullFrameProps.headingSize =
      (fullFrameProps.headingSize * fullFrameProps.height) / maxHeight
    fullFrameProps.headingPosY = fullFrameProps.headingSize + 16

    const adjustedFrameProps = frameTemplates[
      fullFrameProps.template
    ].adjustProps(fullFrameProps)

    const canvasObj = Object.assign(document.createElement('canvas'), {
      height: adjustedFrameProps.height,
      width: adjustedFrameProps.width,
    })
    frameRender(canvasObj.getContext('2d'), adjustedFrameProps).then(() => {
      saveAs(canvasObj.toDataURL('image/png'), 'screenshot.png')
    })
  }, [frameCanvasProps])

  return (
    <Container className='my-3 min-vh-100'>
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>Screenshot Generator</h1>
        </Container>
      </Jumbotron>
      <Row className='align-items-center'>
        <Col lg={8}>
          <Form>
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <FormFile
                  id='scrFile'
                  label='Upload a screenshot'
                  accept='image/*'
                  custom
                  onChange={(e) =>
                    modFrameCanvasProps({
                      screenshot: window.URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </Col>
            </Form.Row>
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Template</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='select'
                    custom
                    defaultValue={frameCanvasProps.template}
                    onChange={eventTemplate}
                  >
                    {Object.keys(frameTemplates).map((fTemplate, fIndex) => (
                      <option value={fTemplate} key={fIndex}>
                        {frameTemplates[fTemplate].name}
                      </option>
                    ))}
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Device</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='select'
                    custom
                    onChange={eventFrame}
                    defaultValue={defaultFrameId}
                  >
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
              </Col>
            </Form.Row>
            <hr />
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Caption</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='textarea'
                    aria-label='Caption'
                    placeholder='Add Caption Here'
                    onChange={(e) =>
                      modFrameCanvasProps({ heading: e.target.value })
                    }
                  />
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Font Size</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='select'
                    custom
                    defaultValue={frameDefaults.headingSize}
                    onChange={(e) => {
                      const numValue = parseInt(e.target.value, 10)
                      if (
                        !Number.isNaN(numValue) &&
                        Number.isFinite(numValue)
                      ) {
                        modFrameCanvasProps({
                          headingSize: numValue || frameDefaults.headingSize,
                          headingPosY:
                            16 + (numValue || frameDefaults.headingPosY),
                        })
                      }
                    }}
                  >
                    <option value='18'>Small</option>
                    <option value='24'>Medium</option>
                    <option value='28'>Large</option>
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Font Family</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='select'
                    custom
                    defaultValue='Arial'
                    onChange={(e) =>
                      modFrameCanvasProps({ headingFont: e.target.value })
                    }
                  >
                    <option>Arial</option>
                    <option>Times New Roman</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                    <option>Montserrat</option>
                    <option>Poppin</option>
                  </FormControl>
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Font Family</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl as='select' custom>
                    <option value='400'>Light</option>
                    <option value='600'>Normal</option>
                    <option value='800'>Bold</option>
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Font Color</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly
                    placeholder={frameDefaults.headingColor}
                    value={frameCanvasProps.headingColor}
                    aria-label='Font Color'
                  />
                  <InputGroup.Append>
                    <ColorPicker
                      className='input-group-text p-0'
                      enableAlpha={false}
                      defaultColor={frameDefaults.headingColor}
                      color={frameCanvasProps.headingColor}
                      onChange={({ color }) =>
                        modFrameCanvasProps({ headingColor: color })
                      }
                    >
                      <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                    </ColorPicker>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <hr />
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Background Template</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='select'
                    onChange={(e) => {
                      modFrameCanvasProps({
                        backgroundImage: `/scr/bg/${e.target.value}`,
                      })
                    }}
                  >
                    <option value=''>None</option>
                    {scrBg.map(({ path }, index) => (
                      <option value={path} key={index}>
                        {`Option ${index}`}
                      </option>
                    ))}
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md className='m-1'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Background Color</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    readOnly
                    placeholder={frameDefaults.backgroundColor}
                    value={frameCanvasProps.backgroundColor}
                    aria-label='Background Color'
                  />
                  <InputGroup.Append>
                    <ColorPicker
                      className='input-group-text p-0'
                      enableAlpha={false}
                      defaultColor={frameDefaults.backgroundColor}
                      color={frameCanvasProps.backgroundColor}
                      onChange={({ color }) =>
                        modFrameCanvasProps({ backgroundColor: color })
                      }
                    >
                      <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                    </ColorPicker>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
            <hr />
            <Form.Row>
              <Col md className='m-1'>
                <FormControl
                  className='btn btn-info'
                  type='reset'
                  onClick={() => updateFrameCanvasProps(frameDefaults)}
                  value='Reset'
                />
              </Col>
              <Col md className='m-1'>
                <FormControl
                  className='btn btn-success'
                  type='button'
                  onClick={eventSave}
                  value='Save'
                />
              </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col
          lg={4}
          className='text-center'
          style={{ minHeight: `${maxHeight}px` }}
        >
          <FrameCanvas
            ref={canvasRef}
            updateCanvasProps={modFrameCanvasProps}
            style={{ boxShadow: '#CCC 0px 0px 32px' }}
            {...frameCanvasProps} // eslint-disable-line react/jsx-props-no-spreading
          />
        </Col>
      </Row>
    </Container>
  )
}
