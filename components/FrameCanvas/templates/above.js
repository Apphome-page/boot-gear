import canvasText from '../../../helpers/canvasText'

export default {
  name: 'Caption Above',
  adjustProps: (newProps) => {
    const {
      heading,
      headingColor,
      headingFont,
      headingSize,
      headingPosX,
      headingPosY,
      framePosY,
      screenshotPosY,
      height,
      width,
    } = newProps
    const ctx = Object.assign(document.createElement('canvas'), {
      height,
      width,
    }).getContext('2d')
    const headingHeight =
      heading && headingSize
        ? canvasText(ctx, {
            text: heading,
            x: headingPosX,
            y: 16 + headingSize,
            size: headingSize,
            face: headingFont,
            color: headingColor,
          }) + 4
        : 0
    const updatedHeadingPosY = headingSize + 16
    const isOverlap = headingHeight > framePosY
    const updatedFramePosY = isOverlap ? headingHeight : framePosY
    const updatedScreenshotPosY = isOverlap
      ? screenshotPosY + (updatedFramePosY - framePosY)
      : screenshotPosY
    return {
      ...newProps,
      headingPosY: updatedHeadingPosY,
      framePosY: updatedFramePosY,
      screenshotPosY: updatedScreenshotPosY,
    }
  },
}
