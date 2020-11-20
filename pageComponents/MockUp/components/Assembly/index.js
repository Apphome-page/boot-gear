import { useContext } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { X as IconX } from '@emotion-icons/bootstrap/X'
import { Back as IconCopy } from '@emotion-icons/bootstrap/Back'
// import { ChevronDoubleLeft as IconDoubleLeft } from '@emotion-icons/bootstrap/ChevronDoubleLeft'
// import { ChevronDoubleRight as IconDoubleRight } from '@emotion-icons/bootstrap/ChevronDoubleRight'
import { ArrowRepeat as IconRepeat } from '@emotion-icons/bootstrap/ArrowRepeat'

import FrameCanvas from '../../../../components/FrameCanvas'

import { MockupContext } from '../../helpers/MockProvider'

import { Wrap, Dummy } from './style'

export default function Assembly() {
  const {
    data: mockStore,
    current: currentMockUp,
    add: addMockStore,
    remove: removeMockStore,
    setCurrent: setCurrentMockUp,
    eventDuplicate,
    eventReset,
  } = useContext(MockupContext)
  return (
    <div className='p-2 d-flex align-items-center bg-light rounded border text-nowrap overflow-auto'>
      {mockStore.map((mockItem, mockIndex) => (
        <Wrap
          className={`flex-shrink-0 cursor-pointer${
            mockIndex === currentMockUp ? ' border-dark' : ''
          }`}
          key={mockIndex}
        >
          <div className='mx-2 text-right'>
            {/* <OverlayTrigger overlay={<Tooltip>Move Left</Tooltip>}>
              <Button variant='light' className='py-0 px-2 ml-1 mb-1'>
                <IconDoubleLeft size='12' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
              <Button variant='light' className='py-0 px-2 ml-1 mb-1'>
                <IconDoubleRight size='12' />
              </Button>
            </OverlayTrigger> */}
            <OverlayTrigger overlay={<Tooltip>Duplicate</Tooltip>}>
              <Button
                variant='light'
                className='py-0 px-2 ml-1 mb-1'
                onClick={() => eventDuplicate(mockIndex)}
              >
                <IconCopy size='12' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Reset</Tooltip>}>
              <Button
                variant='light'
                className='py-0 px-2 ml-1 mb-1'
                onClick={() => eventReset(mockIndex)}
              >
                <IconRepeat size='12' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
              <Button
                variant='light'
                className='py-0 px-1 ml-1 mb-1'
                onClick={() => {
                  removeMockStore(mockIndex)
                }}
              >
                <IconX size='18' />
              </Button>
            </OverlayTrigger>
          </div>
          <FrameCanvas
            renderProps={mockItem}
            onClick={() => {
              setCurrentMockUp(mockIndex)
            }}
          />
        </Wrap>
      ))}
      <Dummy
        onClick={addMockStore}
        className='mt-5 mx-2 border rounded d-flex flex-shrink-0 justify-content-center align-items-center bg-dark text-light text-center display-1 cursor-pointer hover-blur'
      />
    </div>
  )
}
