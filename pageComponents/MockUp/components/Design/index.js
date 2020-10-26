import {
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import ColorPicker from 'rc-color-picker'

import scrBg from '../../../../config/scrBg.json'
import scrMeta from '../../../../config/scrMeta.json'

import frameTemplates from '../../templates'
import { defaultFrameId } from '../../helpers/defaults'

import {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight,
} from '../../style'

export default function Design() {
  return (
    <>
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
        <FormControl as='select' custom>
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
          <ColorPicker className='input-group-text p-0' enableAlpha={false}>
            <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
          </ColorPicker>
        </InputGroup.Append>
      </InputGroup>
    </>
  )
}
