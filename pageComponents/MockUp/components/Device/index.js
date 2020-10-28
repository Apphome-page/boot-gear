import { useEffect, useCallback, useContext, useRef } from 'react'
import {
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Form,
} from 'react-bootstrap'
import isEmpty from 'lodash/isEmpty'

import { MockupContext } from '../../helpers/MockProvider'

import scrMeta from '../../../../config/scrMeta.json'

import { getFrameProps } from '../../helpers/defaults'

import {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight,
} from '../../style'

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

  const eventFrame = useCallback(
    (e) => {
      const { frameDevice, height: maxHeight } = currentMockStore
      modCurrentMockUp(
        getFrameProps(
          e.target.options[e.target.selectedIndex].dataset.type || 'android',
          e.target.value,
          { maxHeight, frameDevice }
        )
      )
    },
    [currentMockStore, modCurrentMockUp]
  )

  const eventModel = useCallback(
    (e) => {
      const { frameType, frameId, height: maxHeight } = currentMockStore
      modCurrentMockUp({
        ...getFrameProps(frameType, frameId, {
          maxHeight,
          frameDevice: e.target.value,
        }),
      })
    },
    [currentMockStore, modCurrentMockUp]
  )

  useEffect(() => {
    formRef.current.elements.designFrame.value = currentMockStore.frameId
  }, [currentMockStore])

  return (
    <Form ref={formRef} onSubmit={noAction}>
      <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Device Style</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as='select'
          name='designFrame'
          custom
          defaultValue={currentMockStore.frameId}
          onChange={eventFrame}
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
      <InputGroup className='m-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>Device Model</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as='select'
          name='designModel'
          custom
          defaultValue={-1}
          onChange={eventModel}
          className='text-capitalize'
        >
          {scrMeta[currentMockStore.frameType]
            .find(({ id }) => id === currentMockStore.frameId)
            .sizes.map((model, key) => (
              <option key={key} value={model}>
                {model
                  .replace(/(\d+)/g, ' $1')
                  .replace(/_/g, ' ')
                  .replace('custom', '')}
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
    </Form>
  )
}
