import { useState, useEffect, useCallback, forwardRef } from 'react'
import { Spinner } from 'react-bootstrap'
import debounce from 'lodash/debounce'

import render from '../../utils/renderCanvas'

import { CanvasLoader } from './style'

// TODO: Set default measurements / template
function FrameCanvas(frameCanvasProps, canvasRef) {
  const { width = 0, height = 0, className } = frameCanvasProps
  const [isLoading, setLoading] = useState(false)

  const renderFrame = useCallback(async () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    setLoading(true)
    await render(ctx, frameCanvasProps)
    setLoading(false)
  }, [canvasRef, frameCanvasProps, height, width])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRender = useCallback(debounce(renderFrame, 200), [renderFrame])

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return
    }
    debouncedRender()
  }, [canvasRef, width, height, debouncedRender])

  return (
    <div className='position-relative'>
      <canvas ref={canvasRef} className={className} />
      <CanvasLoader
        className={`${isLoading ? '' : 'd-none'}`}
        style={{ width }}
      >
        <Spinner animation='border' variant='light' />
      </CanvasLoader>
    </div>
  )
}

export default forwardRef(FrameCanvas)
