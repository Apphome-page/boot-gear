import { useContext } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import classNames from 'classnames'

import IconX from '@svg-icons/bootstrap/x.svg'
import IconCopy from '@svg-icons/bootstrap/back.svg'
// import IconDoubleLeft from '@svg-icons/bootstrap/chevron-double-left.svg'
// import IconDoubleRight from '@svg-icons/bootstrap/chevron-double-right.svg'
import IconRepeat from '@svg-icons/bootstrap/arrow-repeat.svg'

import FrameCanvas from '../../../../components/FrameCanvas'

import { MockupContext } from '../../helpers/MockProvider'

import styles from '../../styles.module.scss'

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
    <div className='p-3 d-flex align-items-center bg-light rounded border text-nowrap overflow-auto'>
      {mockStore.map((mockItem, mockIndex) => (
        <div
          className={classNames(
            'flex-shrink-0',
            'cursor-pointer',
            {
              'border-dark': mockIndex === currentMockUp,
            },
            styles.assemblyWrap
          )}
          key={mockIndex}
        >
          <div className='mx-1 text-right'>
            {/* <OverlayTrigger overlay={<Tooltip>Move Left</Tooltip>}>
              <Button variant='light' className='py-0 px-3 ml-1 mb-1'>
                <IconDoubleLeft height='12' width='12' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Move Right</Tooltip>}>
              <Button variant='light' className='py-0 px-3 ml-1 mb-1'>
                <IconDoubleRight height='12' width='12' />
              </Button>
            </OverlayTrigger> */}
            <OverlayTrigger overlay={<Tooltip>Duplicate</Tooltip>}>
              <Button
                variant='light'
                className='py-0 px-3 ml-1 mb-1'
                onClick={() => eventDuplicate(mockIndex)}
              >
                <IconCopy height='12' width='12' />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Reset</Tooltip>}>
              <Button
                variant='light'
                className='py-0 px-3 ml-1 mb-1'
                onClick={() => eventReset(mockIndex)}
              >
                <IconRepeat height='12' width='12' />
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
                <IconX height='18' width='18' />
              </Button>
            </OverlayTrigger>
          </div>
          <FrameCanvas
            renderProps={mockItem}
            onClick={() => {
              setCurrentMockUp(mockIndex)
            }}
          />
        </div>
      ))}
      <Button
        variant='dark'
        onClick={addMockStore}
        className={classNames(
          'mt-3',
          'mx-1',
          'border',
          'rounded',
          'd-flex',
          'flex-shrink-0',
          'justify-content-center',
          'align-items-center',
          'bg-dark',
          'text-light',
          'text-center',
          'cursor-pointer',
          styles.assemblyDummy
        )}
      />
    </div>
  )
}
