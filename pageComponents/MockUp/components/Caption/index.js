import { useCallback, useContext, useEffect, useRef } from 'react'
import { InputGroup, Form, FormControl, Tabs, Tab } from 'react-bootstrap'
import { Code as CodeLoader } from 'react-content-loader'

import dynamic from 'next/dynamic'
import debounce from 'lodash/debounce'

import { MockupContext } from '../../helpers/MockProvider'

const ColorPicker = dynamic(() => import('../ColorPicker'), {
  ssr: false,
  loading: CodeLoader,
})

export default function Caption() {
  const formRef = useRef(null)
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const {
    heading,
    headingColor,
    headingFont,
    headingSize,
    headingPosY,
  } = mockStore[currentMockUp]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionValue = useCallback(
    debounce((key, value) => {
      modCurrentMockUp({ [key]: value })
    }, 200),
    [modCurrentMockUp]
  )

  useEffect(() => {
    formRef.current.elements.caption.value = heading
    formRef.current.elements.captionSize.value = headingSize
    formRef.current.elements.captionFont.value = headingFont
  }, [heading, headingFont, headingSize])

  return (
    <Form ref={formRef}>
      <Tabs
        defaultActiveKey='caption-text'
        className='justify-content-center mt-1 mb-3'
      >
        <Tab eventKey='caption-text' title='Text'>
          <InputGroup className='m-1 mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text>Caption</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name='caption'
              as='textarea'
              aria-label='Caption'
              placeholder='Add Caption Here'
              defaultValue={heading}
              onChange={(e) => actionValue('heading', e.target.value)}
            />
          </InputGroup>
          <ColorPicker
            color={headingColor}
            onChange={({ hex: color }) => actionValue('headingColor', color)}
          />
        </Tab>
        <Tab eventKey='caption-font' title='Font'>
          <InputGroup className='m-1'>
            <InputGroup.Prepend>
              <InputGroup.Text>Font Size</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as='select'
              name='captionSize'
              custom
              defaultValue={headingSize}
              onChange={(e) => {
                const numValue = parseInt(e.target.value, 10)
                if (!Number.isNaN(numValue) && Number.isFinite(numValue)) {
                  modCurrentMockUp({
                    headingSize: numValue || headingSize,
                    headingPosY: 16 + (numValue || headingPosY),
                  })
                }
              }}
            >
              <option value='16'>Small</option>
              <option value='18'>Medium</option>
              <option value='20'>Large</option>
            </FormControl>
          </InputGroup>
          <InputGroup className='m-1'>
            <InputGroup.Prepend>
              <InputGroup.Text>Font Family</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as='select'
              name='captionFont'
              custom
              defaultValue={headingFont}
              onChange={(e) => actionValue('headingFont', e.target.value)}
            >
              <option>Arial</option>
              <option>Times New Roman</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Montserrat</option>
              <option>Poppins</option>
            </FormControl>
          </InputGroup>
        </Tab>
      </Tabs>
    </Form>
  )
}
