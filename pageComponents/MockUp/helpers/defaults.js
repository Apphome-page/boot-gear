import scrMeta from '../../../config/scrMeta.json'
import scrSizes from '../../../config/scrSizes.json'

export const defaultFrameId = 'NEXUS5X_BLACK'

export const {
  W: defaultWidth,
  H: defaultHeight,
  SCR_X: defaultScrX,
  SCR_Y: defaultScrY,
  SCR_W: defaultScrWidth,
  SCR_H: defaultScrHeight,
} = scrSizes[scrMeta.android.find(({ id }) => id === defaultFrameId).sizes[0]]

export function defaultProps(maxHeight) {
  const defaultScale = maxHeight ? maxHeight / defaultHeight : 1
  return {
    heading: '',
    headingColor: '#ffffff',
    headingFont: 'Arial',
    headingSize: parseInt((defaultHeight * defaultScale) / 21, 10),
    headingPosX: (defaultWidth * defaultScale) / 2,
    headingPosY: 0,
    frameType: 'android',
    frameId: 'NEXUS5X_BLACK',
    frameDevice: 'nexus5x',
    frame: '/scr/android/NEXUS5X_BLACK/nexus5x.png',
    framePosX: 0,
    framePosY: 0,
    frameWidth: defaultWidth * defaultScale,
    frameHeight: defaultHeight * defaultScale,
    frameRot: 0,
    screenshot: '/scr/default.png',
    screenshotPosX: defaultScrX * defaultScale,
    screenshotPosY: defaultScrY * defaultScale,
    screenshotWidth: defaultScrWidth * defaultScale,
    screenshotHeight: defaultScrHeight * defaultScale,
    screenshotRot: 0,
    width: defaultWidth * defaultScale,
    height: defaultHeight * defaultScale,
    backgroundColor: '#7b10ff',
    backgroundImage: '',
    template: 'none',
  }
}

export function scaleFrameProps(
  {
    width,
    height,
    headingSize,
    headingPosX,
    headingPosY,
    backgroundImage,
    frameType,
    frameId,
    frameDevice,
    framePosX,
    framePosY,
    frameWidth,
    frameHeight,
    screenshotPosX,
    screenshotPosY,
    screenshotWidth,
    screenshotHeight,
  } = {},
  scale = 1
) {
  const deviceMeta = scrMeta[frameType].find(({ id }) => id === frameId)
  const deviceSize = frameDevice || (deviceMeta && deviceMeta.sizes[0])
  return {
    width: width * scale,
    height: height * scale,
    headingSize: parseInt(headingSize * scale, 10) + 1,
    headingPosX: headingPosX * scale,
    headingPosY: headingPosY * scale,
    backgroundImage: backgroundImage.replace('scrPreview/', 'scr/'),
    frame: `/scr/${frameType}/${frameId}/${deviceSize}.png`,
    framePosX: framePosX * scale,
    framePosY: framePosY * scale,
    frameWidth: frameWidth * scale,
    frameHeight: frameHeight * scale,
    screenshotPosX: screenshotPosX * scale,
    screenshotPosY: screenshotPosY * scale,
    screenshotWidth: screenshotWidth * scale,
    screenshotHeight: screenshotHeight * scale,
  }
}

export function getFrameProps(
  frameType,
  frameId,
  { lastFrame, frameDevice, maxHeight } = {}
) {
  if (!frameId || !scrMeta[frameType]) {
    return {}
  }
  const deviceMeta = scrMeta[frameType].find(({ id }) => id === frameId)
  const deviceSize =
    frameDevice ||
    (deviceMeta &&
      deviceMeta.sizes[lastFrame ? deviceMeta.sizes.length - 1 : 0])
  if (!deviceSize || !deviceSize.length || !scrSizes[deviceSize]) {
    return {}
  }
  const {
    W: width,
    H: height,
    SCR_X: scrX,
    SCR_Y: scrY,
    SCR_W: scrWidth,
    SCR_H: scrHeight,
  } = scrSizes[deviceSize]
  const scale = maxHeight ? maxHeight / height : 1
  return {
    width: width * scale,
    height: height * scale,
    headingPosX: (width * scale) / 2,
    frameType,
    frameId,
    frameDevice: frameDevice || deviceSize,
    frame: `/scrPreview/${frameType}/${frameId}/${deviceSize}.png`,
    framePosX: 0,
    framePosY: 0,
    frameWidth: width * scale,
    frameHeight: height * scale,
    frameRot: 0,
    screenshotPosX: scrX * scale,
    screenshotPosY: scrY * scale,
    screenshotWidth: scrWidth * scale,
    screenshotHeight: scrHeight * scale,
    screenshotRot: 0,
  }
}
