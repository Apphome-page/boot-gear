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
    headingSize: 24,
    headingPosX: (defaultWidth * defaultScale) / 2,
    headingPosY: 40,
    frameType: 'android',
    frameId: 'NEXUS5X_BLACK',
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
    template: 'above',
  }
}

export function getFrameProps(
  frameType,
  frameId,
  { lastFrame, maxHeight } = {}
) {
  if (!frameId || !scrMeta[frameType]) {
    return {}
  }
  const deviceMeta = scrMeta[frameType].find(({ id }) => id === frameId)
  const deviceSize =
    deviceMeta.sizes[lastFrame ? deviceMeta.sizes.length - 1 : 0]
  if (
    !deviceMeta ||
    !deviceMeta.sizes ||
    !deviceMeta.sizes.length ||
    !scrSizes[deviceSize]
  ) {
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
    frame: `/scr/${frameType}/${frameId}/${deviceSize}.png`,
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
