import { renderText } from '../../../utils/renderCanvas'

export default {
  name: 'Caption Above',
  adjustProps: (newProps) => {
    const {
      heading,
      headingColor,
      headingFont,
      headingSize,
      headingPosX,
      framePosY,
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
        y: 16 + headingSize,
        size: headingSize,
        face: headingFont,
        color: headingColor,
      }) + 4
    const updatedHeadingPosY = headingSize + height / 32
    const isOverlap = headingHeight > framePosY
    const updatedFramePosY = isOverlap ? headingHeight : framePosY
    const updatedScreenshotPosY = isOverlap
      ? screenshotPosY + (updatedFramePosY - framePosY)
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
