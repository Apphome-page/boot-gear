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

  const { heading } = mockStore[currentMockUp]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionCaption = useCallback(
    debounce((caption) => {
      modCurrentMockUp({ heading: caption })
    }, 200),
    [modCurrentMockUp]
  )

  useEffect(() => {
    formRef.current.elements.caption.value = heading
  }, [heading])

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
          onChange={(e) => actionCaption(e.target.value)}
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
          <InputGroup.Text>Font Color</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl readOnly aria-label='Font Color' />
        <InputGroup.Append>
          <ColorPicker className='input-group-text p-0' enableAlpha={false}>
            <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
          </ColorPicker>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}
