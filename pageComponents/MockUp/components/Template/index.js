import { useCallback, useContext } from 'react'
import {
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'

import { MockupContext } from '../../helpers/MockProvider'

import frameTemplates from '../../templates'
import { getFrameProps } from '../../helpers/defaults'

import {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight,
} from './style'

export default function Template() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

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

  const eventDevice = useCallback(
    (e) => {
      const { direction } = e.target.dataset
      const {
        framePosX,
        framePosY,
        frameRot,
        screenshotPosX,
        screenshotPosY,
        screenshotRot,
      } = currentMockStore
      const deltaData = {}
      switch (direction) {
        case 'left':
          deltaData.framePosX = framePosX - 8
          deltaData.screenshotPosX = screenshotPosX - 8
          break
        case 'right':
          deltaData.framePosX = framePosX + 8
          deltaData.screenshotPosX = screenshotPosX + 8
          break
        case 'up':
          deltaData.framePosY = framePosY - 8
          deltaData.screenshotPosY = screenshotPosY - 8
          break
        case 'down':
          deltaData.framePosY = framePosY + 8
          deltaData.screenshotPosY = screenshotPosY + 8
          break
        case 'rotLeft':
          deltaData.frameRot = frameRot - 8
          deltaData.screenshotRot = screenshotRot - 8
          break
        case 'rotRight':
          deltaData.frameRot = frameRot + 8
          deltaData.screenshotRot = screenshotRot + 8
          break
        default:
          break
      }
      if (!isEmpty(deltaData)) {
        modCurrentMockUp(deltaData)
      }
    },
    [currentMockStore, modCurrentMockUp]
  )

  return (
    <>
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
      <InputGroup className='m-1' onClick={eventDevice}>
        <FormControl readOnly disabled value='Device Position' />
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Left</Tooltip>}>
            <MoveLeft
              className='btn btn-outline-secondary'
              data-direction='left'
            />
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Up</Tooltip>}>
            <MoveUp className='btn btn-outline-secondary' data-direction='up' />
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Down</Tooltip>}>
            <MoveDown
              className='btn btn-outline-secondary'
              data-direction='down'
            />
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
            <MoveRight
              className='btn btn-outline-secondary'
              data-direction='right'
            />
          </OverlayTrigger>
        </InputGroup.Append>
      </InputGroup>
      <InputGroup className='m-1' onClick={eventDevice}>
        <FormControl readOnly disabled value='Device Rotation' />
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Rotate Left</Tooltip>}>
            <RotateLeft
              className='btn btn-outline-secondary'
              data-direction='rotLeft'
            />
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Rotate Right</Tooltip>}>
            <RotateRight
              className='btn btn-outline-secondary'
              data-direction='rotRight'
            />
          </OverlayTrigger>
        </InputGroup.Append>
      </InputGroup>
    </>
  )
}
