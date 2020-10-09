import canvasText from '../../helpers/canvasText'
import canvasImage from '../../helpers/canvasImage'

export default async function render(
  ctx,
  {
    heading,
    headingColor,
    headingFont,
    headingSize,
    headingPosX,
    headingPosY,
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
    width,
    height,
    backgroundColor,
    backgroundImage,
  }
) {
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = backgroundColor
  ctx.fill()
  ctx.restore()
  await (backgroundImage &&
    canvasImage(ctx, {
      url: backgroundImage,
      posX: 0,
      posY: 0,
      rot: 0,
      width,
      height,
    }))
  await canvasImage(ctx, {
    url: screenshot,
    posX: screenshotPosX,
    posY: screenshotPosY,
    rot: screenshotRot,
    width: screenshotWidth,
    height: screenshotHeight,
  })
  await canvasImage(ctx, {
    url: frame,
    posX: framePosX,
    posY: framePosY,
    rot: frameRot,
    width: frameWidth,
    height: frameHeight,
  })
  if (heading && headingSize) {
    canvasText(ctx, {
      text: heading,
      x: headingPosX,
      y: headingPosY,
      size: headingSize,
      face: headingFont,
      color: headingColor,
    })
  }
}
