import { useEffect, useCallback, forwardRef } from 'react'
import debounce from 'lodash/debounce'

import canvasText from '../../helpers/canvasText'
import canvasImage from '../../helpers/canvasImage'

// TODO: Set default measurements / template
function FrameCanvas(
  {
    heading = '',
    headingColor = '#000',
    headingFont = 'Arial',
    headingSize = 0.125,
    headingPosX = 0,
    headingPosY = 0,
    frame = '',
    framePosX = 0,
    framePosY = 0,
    frameWidth = 0,
    frameHeight = 0,
    frameRot = 0,
    screenshot = '',
    screenshotPosX = 0,
    screenshotPosY = 0,
    screenshotWidth = 0,
    screenshotHeight = 0,
    screenshotRot = 0,
    width = 0,
    height = 0,
    updateCanvasProps,
    ...restProps
  },
  canvasRef
) {
  const updateHeading = useCallback(() => {
    if (!heading) {
      return
    }
    const ctx = canvasRef.current.getContext('2d')
    canvasText(ctx, {
      text: heading,
      x: headingPosX,
      y: headingPosY,
      size: headingSize,
      face: headingFont,
      color: headingColor,
    })
  }, [
    canvasRef,
    heading,
    headingColor,
    headingFont,
    headingSize,
    headingPosX,
    headingPosY,
    framePosY,
    updateCanvasProps,
  ])

  const updateSnapshot = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    return Promise.all([])
      .then(() =>
        canvasImage(ctx, {
          url: screenshot,
          posX: screenshotPosX,
          posY: screenshotPosY,
          rot: screenshotRot,
          width: screenshotWidth,
          height: screenshotHeight,
        })
      )
      .then(() =>
        canvasImage(ctx, {
          url: frame,
          posX: framePosX,
          posY: framePosY,
          rot: frameRot,
          width: frameWidth,
          height: frameHeight,
        })
      )
  }, [
    canvasRef,
    frame,
    framePosX,
    framePosY,
    frameWidth,
    frameHeight,
    frameRot,
    screenshot,
    screenshotPosX,
    screenshotPosY,
    screenshotWidth,
    screenshotHeight,
    screenshotRot,
  ])

  const renderFrame = debounce(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.clearRect(0, 0, width, height)
    updateHeading()
    updateSnapshot()
  }, 100)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) {
      return
    }
    renderFrame()
  }, [canvasRef, updateHeading, updateSnapshot, width, height])

  return <canvas ref={canvasRef} {...restProps}></canvas>
}

export default forwardRef(FrameCanvas)
