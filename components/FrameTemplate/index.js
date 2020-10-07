import { useState, useCallback } from 'react'

import { defaultProps as frameDefaultProps } from '../FrameCanvas/defaults'

import {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight,
} from './style'

const frameDefaults = frameDefaultProps(512)

export default function FrameTemplate() {
  const [frameCanvasProps, modFrameCanvasProps] = useState({})
  const eventPosition = useCallback(
    (e) => {
      const { type } = e.target.dataset
      const value = parseInt(e.target.dataset.value, 10)
      const deg = value % 360
      if (isNaN(value) || !isFinite(value)) {
        return
      }
      const {
        framePosX,
        framePosY,
        frameRot,
        screenshotPosX,
        screenshotPosY,
        screenshotRot,
      } = frameCanvasProps
      switch (type) {
        case 'x':
          modFrameCanvasProps({
            framePosX: framePosX + value,
            screenshotPosX: screenshotPosX + value,
          })
          break
        case 'y':
          modFrameCanvasProps({
            framePosY: framePosY + value,
            screenshotPosY: screenshotPosY + value,
          })
          break
        case 'deg':
          modFrameCanvasProps({
            frameRot: frameRot + deg,
            screenshotRot: screenshotRot + deg,
          })
          break
        default:
          break
      }
    },
    [frameCanvasProps, modFrameCanvasProps]
  )

  return (
    <section role='button' tabIndex='-1' onClick={eventPosition}>
      <RotateLeft
        type='button'
        className='btn btn-secondary m-1'
        data-type='deg'
        data-value='-5'
      />
      <MoveUp
        type='button'
        className='btn btn-secondary m-1'
        data-type='y'
        data-value={`-${frameDefaults.height / 16}`}
      />
      <RotateRight
        type='button'
        className='btn btn-secondary m-1'
        data-type='deg'
        data-value='5'
      />
      <br />
      <MoveLeft
        type='button'
        className='btn btn-secondary m-1'
        data-type='x'
        data-value={`-${frameDefaults.width / 16}`}
      />
      <MoveDown
        type='button'
        className='btn btn-secondary m-1'
        data-type='y'
        data-value={`${frameDefaults.height / 16}`}
      />
      <MoveRight
        type='button'
        className='btn btn-secondary m-1'
        data-type='x'
        data-value={`${frameDefaults.width / 16}`}
      />
    </section>
  )
}
