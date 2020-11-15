import { useEffect, useCallback, useContext, useRef } from 'react'
import { InputGroup, FormControl, Form } from 'react-bootstrap'
import ColorPicker from 'rc-color-picker'

import { MockupContext } from '../../helpers/MockProvider'

// import scrBg from '../../../../config/scrBg.json'

import frameTemplates from '../../templates'
import { getFrameProps } from '../../helpers/defaults'

export default function Design() {
  const formRef = useRef(null)
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const noAction = useCallback((e) => {
    e.preventDefault()
  }, [])

  const eventTemplate = useCallback(
    (e) => {
      const {
        frameType,
        frameId,
        frameDevice,
        height: maxHeight,
      } = currentMockStore
      modCurrentMockUp({
        ...getFrameProps(frameType, frameId, { maxHeight, frameDevice }),
        template: e.target.value,
      })
    },
    [currentMockStore, modCurrentMockUp]
  )

  useEffect(() => {
    formRef.current.elements.designTemplate.value = currentMockStore.template
  }, [currentMockStore])

  return (
    <Form ref={formRef} onSubmit={noAction}>
      <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Template</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as='select'
          name='designTemplate'
          custom
          defaultValue={currentMockStore.template}
          onChange={eventTemplate}
        >
          {Object.keys(frameTemplates).map((fTemplate, fIndex) => (
            <option value={fTemplate} key={fIndex}>
              {frameTemplates[fTemplate].name}
            </option>
          ))}
        </FormControl>
      </InputGroup>
      {/* <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Background Template</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as='select' custom>
          <option value=''>None</option>
          {scrBg.map(({ path }, index) => (
            <option value={path} key={index}>
              {`Option ${index}`}
            </option>
          ))}
        </FormControl>
      </InputGroup> */}
      <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Background Color</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          readOnly
          aria-label='Background Color'
          value={currentMockStore.backgroundColor}
        />
        <InputGroup.Append>
          <ColorPicker
            className='input-group-text p-0'
            enableAlpha={false}
            defaultColor={currentMockStore.backgroundColor}
            color={currentMockStore.backgroundColor}
            onChange={({ color }) =>
              modCurrentMockUp({ backgroundColor: color })
            }
          >
            <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
          </ColorPicker>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}
