import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'
import {
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  FormFile,
} from 'react-bootstrap'
import debounce from 'lodash/debounce'

import FrameCanvas from '../../components/FrameCanvas'

import renderCanvas from '../../utils/renderCanvas'

import scrMeta from '../../config/scrMeta.json'

import frameTemplates from './templates'

import {
  defaultProps as frameDefaultProps,
  getFrameProps,
} from './helpers/defaults'

const ColorPicker = dynamic(() => import('rc-color-picker'), {
  ssr: false,
})
const Subscription = dynamic(() => import('../../components/Subscription'), {
  ssr: false,
})

const maxHeight = 512
const frameDefaults = frameDefaultProps(maxHeight)

export default function FrameTemplateSingle({ preset = '' }) {
  const [subShow, setSubShow] = useState(false)
  const lastFrame = preset === 'android' || preset === 'ios'
  const [frameCanvasProps, updateFrameCanvasProps] = useState(() => {
    switch (preset) {
      case 'android':
        Object.assign(
          frameDefaults,
          getFrameProps('android', 'NEXUS5X_BLACK', {
            maxHeight,
            lastFrame,
          })
        )
        break
      case 'iphone':
        Object.assign(
          frameDefaults,
          getFrameProps('ios', 'IPHONE_BLACK', { maxHeight })
        )
        break
      case 'ios':
        Object.assign(
          frameDefaults,
          getFrameProps('ios', 'IPHONE_BLACK', { maxHeight, lastFrame })
        )
        break
      default:
        Object.assign(
          frameDefaults,
          getFrameProps('android', 'NEXUS5X_BLACK', { maxHeight })
        )
        break
    }
    return {
      ...frameDefaults,
    }
  })
  const showAndroidDevice = !preset || preset.toLowerCase() === 'android'
  const showAppleDevice =
    !preset ||
    preset.toLowerCase() === 'ios' ||
    preset.toLowerCase() === 'iphone'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modFrameCanvasProps = useCallback(
    debounce((deltaProps) => {
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
    }, 100),
    []
  )

  const eventTemplate = useCallback(
    (e) => {
      const { frameType, frameId } = frameCanvasProps
      modFrameCanvasProps({
        ...getFrameProps(frameType, frameId, { maxHeight, lastFrame }),
        template: e.target.value,
      })
    },
    [frameCanvasProps, lastFrame, modFrameCanvasProps]
  )

  const eventFrame = useCallback(
    (e) => {
      modFrameCanvasProps(
        getFrameProps(
          e.target.options[e.target.selectedIndex].dataset.type || 'android',
          e.target.value,
          { maxHeight, lastFrame }
        )
      )
    },
    [lastFrame, modFrameCanvasProps]
  )

  const eventSave = useCallback(() => {
    const { frameId, frameType } = frameCanvasProps
    const fullFrameProps = {
      ...frameCanvasProps,
      ...getFrameProps(frameType, frameId, { lastFrame }),
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
    renderCanvas(canvasObj.getContext('2d'), adjustedFrameProps)
      .then(() => import('file-saver'))
      .then(({ saveAs }) => {
        saveAs(canvasObj.toDataURL('image/png'), 'screenshot.png')
      })
  }, [frameCanvasProps, lastFrame])

  return (
    <>
      <Subscription
        show={subShow}
        onComplete={() => {
          setSubShow(false)
          eventSave()
        }}
      />
      <Row className='align-items-center'>
        <Col lg={8}>
          <Form>
            <Form.Row className='my-1'>
              <Col md className='m-1'>
                <FormFile
                  id='scrFile'
                  className='cursor-pointer'
                  label='Upload Screenshot'
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
                    defaultValue={frameDefaults.frameId}
                  >
                    {showAndroidDevice ? (
                      <optgroup label='Android'>
                        {scrMeta.android.map((phone, key) => (
                          <option
                            key={key}
                            data-type='android'
                            value={phone.id}
                          >
                            {phone.name}
                          </option>
                        ))}
                      </optgroup>
                    ) : (
                      <></>
                    )}
                    {showAppleDevice ? (
                      <optgroup label='iOS'>
                        {scrMeta.ios.map((phone, key) => (
                          <option key={key} data-type='ios' value={phone.id}>
                            {phone.name}
                          </option>
                        ))}
                      </optgroup>
                    ) : (
                      <></>
                    )}
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
                    <option>Poppins</option>
                  </FormControl>
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Row className='my-1'>
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
                  onClick={() => {
                    setSubShow(true)
                  }}
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
          <FrameCanvas renderProps={frameCanvasProps} />
        </Col>
      </Row>
    </>
  )
}
