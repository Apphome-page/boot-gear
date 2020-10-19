import { renderText } from '../../../utils/renderCanvas'

export default {
  name: 'Caption Below Full Device',
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
    const headingHeight =
      heading && headingSize
        ? renderText(ctx, {
            text: heading,
            x: headingPosX,
            y: 16 + headingSize,
            size: headingSize,
            face: headingFont,
            color: headingColor,
          }) + 4
        : 0
    headingPosY = height - headingHeight + 16
    if (framePosY + frameHeight > headingPosY) {
      framePosY = 0
      frameHeight = height - headingHeight
      const frameScale = frameHeight / prevFrameHeight
      frameWidth *= frameScale
      framePosX = (width - frameWidth) / 2

      // // TODO: Recalculate screenshot values
      screenshotPosY = (prevScreenshotPosY - prevFramePosY) * frameScale
      screenshotHeight *= frameScale
      screenshotWidth *= frameScale
      screenshotPosX = (width - screenshotWidth) / 2
    }
    return {
      ...newProps,
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
