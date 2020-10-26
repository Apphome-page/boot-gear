import { useContext } from 'react'
import { Button } from 'react-bootstrap'

import FrameCanvas from '../../../../components/FrameCanvas'

import { MockupContext } from '../../helpers/MockProvider'

import { Dummy } from '../../style'

export default function Assembly() {
  const {
    data: mockStore,
    current: currentMockUp,
    add: addMockStore,
    remove: removeMockStore,
    setCurrent: setCurrentMockUp,
  } = useContext(MockupContext)
  return (
    <div className='p-2 d-flex align-items-center bg-light rounded border text-nowrap overflow-auto'>
      {mockStore.map((mockItem, mockIndex) => (
        <div className='flex-shrink-0' key={mockIndex}>
          <div
            className={`mb-1 mx-2 text-right border-bottom${
              mockIndex === currentMockUp ? ' border-danger' : ' border-light'
            }`}
          >
            <Button
              variant='light'
              size='sm'
              className='py-0 px-2 mb-1 text-danger'
              onClick={() => removeMockStore(mockIndex)}
            >
              ×
            </Button>
          </div>
          <FrameCanvas
            className='cursor-pointer hover-blur '
            renderProps={mockItem}
            onClick={() => {
              setCurrentMockUp(mockIndex)
            }}
          />
        </div>
      ))}
      <Dummy
        onClick={addMockStore}
        className='mt-5 mx-2 border rounded d-flex flex-shrink-0 justify-content-center align-items-center bg-dark text-light text-center display-1 cursor-pointer hover-blur'
      />
    </div>
  )
}
