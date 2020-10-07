import canvasText from '../../../helpers/canvasText'

export default {
  name: 'Caption Below',
  adjustProps: (newProps) => {
    const {
      heading,
      headingColor,
      headingFont,
      headingSize,
      headingPosX,
      headingPosY,
      framePosY,
      frameHeight,
      screenshotPosY,
      screnshotHeight,
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
            y: headingSize + 16,
            size: headingSize,
            face: headingFont,
            color: headingColor,
          }) + 4
        : 0
    const updatedHeadingPosY = height - headingHeight + 16
    const isOverlap = framePosY + frameHeight > updatedHeadingPosY
    const updatedFramePosY = isOverlap ? 0 - headingHeight : framePosY
    const updatedScreenshotPosY = isOverlap
      ? screenshotPosY - (framePosY - updatedFramePosY)
      : screenshotPosY

    return {
      ...newProps,
      headingPosY: updatedHeadingPosY,
      framePosY: updatedFramePosY,
      screenshotPosY: updatedScreenshotPosY,
    }
  },
}
