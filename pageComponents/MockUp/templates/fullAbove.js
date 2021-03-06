import { renderText } from '../../../utils/renderCanvas'

export default {
  name: 'Caption Above Full Device',
  adjustProps: (newProps) => {
    const {
      heading,
      headingColor,
      headingFont,
      headingSize,
      headingPosX,
      framePosY: prevFramePosY,
      frameHeight: prevFrameHeight,
      screenshotPosY: prevScreenshotPosY,
      height,
      width,
    } = newProps
    let {
      headingPosY,
      framePosX,
      framePosY,
      frameWidth,
      frameHeight,
      screenshotPosX,
      screenshotPosY,
      screenshotWidth,
      screenshotHeight,
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
    headingPosY = headingSize + height / 32
    if (headingHeight > framePosY) {
      framePosY = headingHeight
      frameHeight = height - headingHeight
      const frameScale = frameHeight / prevFrameHeight
      frameWidth *= frameScale
      framePosX = (width - frameWidth) / 2

      // TODO: Recalculate screenshot values
      screenshotPosY =
        headingHeight + (prevScreenshotPosY - prevFramePosY) * frameScale
      screenshotHeight *= frameScale
      screenshotWidth *= frameScale
      screenshotPosX = (width - screenshotWidth) / 2
    }
    return {
      ...newProps,
      heading: headingText,
      headingPosY,
      framePosX,
      framePosY,
      frameWidth,
      frameHeight,
      screenshotPosX,
      screenshotPosY,
      screenshotWidth,
      screenshotHeight,
    }
  },
}
