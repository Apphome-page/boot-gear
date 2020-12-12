import { useCallback, useContext, useEffect, useRef } from 'react'
import { InputGroup, Form, FormControl } from 'react-bootstrap'
import ColorPicker from 'rc-color-picker'
import debounce from 'lodash/debounce'

import { MockupContext } from '../../helpers/MockProvider'

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
      <InputGroup className='m-1'>
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
      <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Font Color</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl readOnly aria-label='Font Color' value={headingColor} />
        <InputGroup.Append>
          <ColorPicker
            className='input-group-text p-0'
            enableAlpha={false}
            defaultColor={headingColor}
            color={headingColor}
            onChange={({ color }) => actionValue('headingColor', color)}
          >
            <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
          </ColorPicker>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}
