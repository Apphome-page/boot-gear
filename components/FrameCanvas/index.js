import { useEffect, forwardRef } from 'react'
import debounce from 'lodash/debounce'

import render from './render'

// TODO: Set default measurements / template
function FrameCanvas(frameCanvasProps, canvasRef) {
  const { width = 0, height = 0, className } = frameCanvasProps

  const renderFrame = debounce(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    render(ctx, frameCanvasProps)
  }, 100)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return
    }
    renderFrame()
  }, [canvasRef, width, height, renderFrame])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <canvas ref={canvasRef} className={className} />
}

export default forwardRef(FrameCanvas)
