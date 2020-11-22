import { useCallback, useContext } from 'react'
import {
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'
import { ArrowLeftShort as IconArrowLeft } from '@emotion-icons/bootstrap/ArrowLeftShort'
import { ArrowRightShort as IconArrowRight } from '@emotion-icons/bootstrap/ArrowRightShort'
import { ArrowUpShort as IconArrowUp } from '@emotion-icons/bootstrap/ArrowUpShort'
import { ArrowDownShort as IconArrowDown } from '@emotion-icons/bootstrap/ArrowDownShort'
import { ArrowClockwise as IconRotateRight } from '@emotion-icons/bootstrap/ArrowClockwise'
import { ArrowCounterclockwise as IconRotateLeft } from '@emotion-icons/bootstrap/ArrowCounterclockwise'

import { MockupContext } from '../../helpers/MockProvider'

import frameTemplates from '../../templates'
import { getFrameProps } from '../../helpers/defaults'

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
            <Button variant='outline-secondary' data-direction='left'>
              <IconArrowLeft size='18' data-direction='left' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Up</Tooltip>}>
            <Button variant='outline-secondary' data-direction='up'>
              <IconArrowUp size='18' data-direction='up' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Down</Tooltip>}>
            <Button variant='outline-secondary' data-direction='down'>
              <IconArrowDown size='18' data-direction='down' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
            <Button variant='outline-secondary' data-direction='right'>
              <IconArrowRight size='18' data-direction='right' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
      </InputGroup>
      <InputGroup className='m-1' onClick={eventDevice}>
        <FormControl readOnly disabled value='Device Rotation' />
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Rotate Left</Tooltip>}>
            <Button variant='outline-secondary' data-direction='rotLeft'>
              <IconRotateLeft size='18' data-direction='rotLeft' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
        <InputGroup.Append>
          <OverlayTrigger overlay={<Tooltip>Rotate Right</Tooltip>}>
            <Button variant='outline-secondary' data-direction='rotRight'>
              <IconRotateRight size='18' data-direction='rotRight' />
            </Button>
          </OverlayTrigger>
        </InputGroup.Append>
      </InputGroup>
    </>
  )
}
