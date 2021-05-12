import { useCallback, useContext } from 'react'
import {
  OverlayTrigger,
  Tooltip,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Container,
} from 'react-bootstrap'

import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

import IconArrowLeft from '@svg-icons/bootstrap/arrow-left-short.svg'
import IconArrowRight from '@svg-icons/bootstrap/arrow-right-short.svg'
import IconArrowUp from '@svg-icons/bootstrap/arrow-up-short.svg'
import IconArrowDown from '@svg-icons/bootstrap/arrow-down-short.svg'
import IconRotateRight from '@svg-icons/bootstrap/arrow-clockwise.svg'
import IconRotateLeft from '@svg-icons/bootstrap/arrow-counterclockwise.svg'

import Image from '../../../../components/Tag/Image'

import frameTemplates from '../../templates'
import { getFrameProps } from '../../helpers/defaults'
import { MockupContext } from '../../helpers/MockProvider'

export default function Layout() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const eventTemplate = useCallback(
    (e) => {
      if (!e.target.dataset.value) {
        return
      }
      const {
        frameType,
        frameId,
        frameDevice,
        height: maxHeight,
      } = currentMockStore
      modCurrentMockUp({
        ...getFrameProps(frameType, frameId, { maxHeight, frameDevice }),
        template: e.target.dataset.value,
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
    <Tabs
      defaultActiveKey='template'
      className='justify-content-center mt-1 mb-3'
    >
      <Tab eventKey='template' title='Template'>
        <Container fluid className='preview-container' onClick={eventTemplate}>
          {Object.keys(frameTemplates).map((fTemplate) => (
            <OverlayTrigger
              key={fTemplate}
              overlay={<Tooltip>{frameTemplates[fTemplate].name}</Tooltip>}
            >
              <div
                className={classNames(
                  'd-inline-block',
                  'm-1',
                  'p-0',
                  'rounded',
                  'cursor-pointer',
                  currentMockStore.template === fTemplate
                    ? 'bg-warning'
                    : 'bg-alt'
                )}
              >
                <Image
                  src={`/scrPreview/template/${fTemplate}.png`}
                  alt='Device Template'
                  data-value={fTemplate}
                  height='100'
                  width='64'
                />
              </div>
            </OverlayTrigger>
          ))}
        </Container>
      </Tab>
      <Tab eventKey='alignment' title='Alignment' className='text-center'>
        <ButtonGroup onClick={eventDevice} className='text-center'>
          <OverlayTrigger overlay={<Tooltip>Move Left</Tooltip>}>
            <Button variant='outline-secondary' data-direction='left'>
              <IconArrowLeft height='18' width='18' data-direction='left' />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Move Up</Tooltip>}>
            <Button variant='outline-secondary' data-direction='up'>
              <IconArrowUp height='18' width='18' data-direction='up' />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Move Down</Tooltip>}>
            <Button variant='outline-secondary' data-direction='down'>
              <IconArrowDown height='18' width='18' data-direction='down' />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
            <Button variant='outline-secondary' data-direction='right'>
              <IconArrowRight height='18' width='18' data-direction='right' />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Rotate Left</Tooltip>}>
            <Button variant='outline-secondary' data-direction='rotLeft'>
              <IconRotateLeft height='18' width='18' data-direction='rotLeft' />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Rotate Right</Tooltip>}>
            <Button variant='outline-secondary' data-direction='rotRight'>
              <IconRotateRight
                height='18'
                width='18'
                data-direction='rotRight'
              />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </Tab>
    </Tabs>
  )
}
