import { renderText } from '../../../utils/renderCanvas'

export default {
  name: 'Caption Below',
  adjustProps: (newProps) => {
    const {
      heading,
      headingColor,
      headingFont,
      headingSize,
      headingPosX,
      framePosY,
      frameHeight,
      screenshotPosY,
      height,
      width,
    } = newProps
    const ctx = Object.assign(document.createElement('canvas'), {
      height,
      width,
    }).getContext('2d')
    const headingText = heading || 'Add your text here'
    const headingHeight =
      renderText(ctx, {
        text: headingText,
        x: headingPosX,
        y: headingSize + 16,
        size: headingSize,
        face: headingFont,
        color: headingColor,
      }) + 4
    const updatedHeadingPosY = height - headingHeight + height / 32
    const isOverlap = framePosY + frameHeight > updatedHeadingPosY
    const updatedFramePosY = isOverlap ? 0 - headingHeight : framePosY
    const updatedScreenshotPosY = isOverlap
      ? screenshotPosY - (framePosY - updatedFramePosY)
      : screenshotPosY

    return {
      ...newProps,
      heading: headingText,
      headingPosY: updatedHeadingPosY,
      framePosY: updatedFramePosY,
      screenshotPosY: updatedScreenshotPosY,
    }
  },
}
