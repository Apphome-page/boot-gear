/* eslint-disable no-param-reassign */
import { useState, useEffect, forwardRef } from 'react'
import { Spinner } from 'react-bootstrap'
import debounce from 'lodash/debounce'

import render from '../../utils/renderCanvas'

import { CanvasLoader } from './style'

// TODO:
const debouncedRender = debounce(async (canvas, ctx, props, setLoading) => {
  canvas.width = props.width
  canvas.height = props.height
  setLoading(true)
  await render(ctx, props)
  setLoading(false)
}, 100)

function FrameCanvas(frameCanvasProps, canvasRef) {
  const { width = 0, height = 0 } = frameCanvasProps
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    debouncedRender(canvas, ctx, frameCanvasProps, setLoading)
  }, [canvasRef, width, height, frameCanvasProps])

  return (
    <div className='position-relative'>
      <canvas ref={canvasRef} className='position-relative' />
      <CanvasLoader style={{ width }} className={isLoading ? '' : 'd-none'}>
        <Spinner animation='border' variant='light' />
      </CanvasLoader>
    </div>
  )
}

export default forwardRef(FrameCanvas)
