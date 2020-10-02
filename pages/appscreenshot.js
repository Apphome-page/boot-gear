import { useRef, useState, useCallback } from 'react'
import Head from 'next/head'
import debounce from 'lodash/debounce'
import ColorPicker from 'rc-color-picker'

import scrMeta from '../config/scrMeta.json'
import scrSizes from '../config/scrSizes.json'

import FrameCanvas from '../components/FrameCanvas'

import canvasText from '../helpers/canvasText'

const defaultScale = 0.2
const defaultFrameId = 'NEXUS5X_BLACK'
const {
  W: defaultWidth,
  H: defaultHeight,
  SCR_X: defaultScrX,
  SCR_Y: defaultScrY,
  SCR_W: defaultScrWidth,
  SCR_H: defaultScrHeight,
} = scrSizes[scrMeta.android.find(({ id }) => id === defaultFrameId).sizes[0]]

const frameDefaults = {
  heading: '',
  headingColor: '#000',
  headingFont: 'Arial',
  headingSize: 32,
  headingPosX: (defaultWidth * defaultScale) / 2,
  headingPosY: 32,
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
}

export default function AppScr() {
  const scale = defaultScale
  const canvasRef = useRef(null)
  const [frameCanvasProps, updateFrameCanvasProps] = useState({
    ...frameDefaults,
  })

  const modFrameCanvasProps = useCallback(
    debounce((deltaProps) => {
      updateFrameCanvasProps((prevFrameCanvasProps) => {
        const newProps = { ...prevFrameCanvasProps, ...deltaProps }
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
        const frameGap =
          heading && headingSize
            ? canvasText(ctx, {
                text: heading,
                x: headingPosX,
                y: headingPosY,
                size: headingSize,
                face: headingFont,
                color: headingColor,
              }) -
              framePosY +
              4
            : 0
        return frameGap > 0
          ? Object.assign(newProps, {
              framePosY: framePosY + frameGap,
              screenshotPosY: screenshotPosY + frameGap,
            })
          : newProps
      })
    }, 300),
    [updateFrameCanvasProps]
  )

  const eventPosition = useCallback(
    (e) => {
      const { type } = e.target.dataset
      const value = parseInt(e.target.dataset.value, 10)
      const deg = value % 360
      if (isNaN(value) || !isFinite(value)) {
        return
      }
      const {
        framePosX,
        framePosY,
        frameRot,
        screenshotPosX,
        screenshotPosY,
        screenshotRot,
      } = frameCanvasProps
      switch (type) {
        case 'x':
          modFrameCanvasProps({
            framePosX: framePosX + value,
            screenshotPosX: screenshotPosX + value,
          })
          break
        case 'y':
          modFrameCanvasProps({
            framePosY: framePosY + value,
            screenshotPosY: screenshotPosY + value,
          })
          break
        case 'deg':
          modFrameCanvasProps({
            frameRot: frameRot + deg,
            screenshotRot: screenshotRot + deg,
          })
          break
        default:
          break
      }
    },
    [frameCanvasProps, modFrameCanvasProps]
  )

  const eventFrame = useCallback(
    (e) => {
      const { type: frameType = 'android' } = e.target.options[
        e.target.selectedIndex
      ].dataset
      const frameId = e.target.value
      if (!frameId || !scrMeta[frameType]) {
        return
      }
      const deviceMeta = scrMeta[frameType].find(({ id }) => id === frameId)
      if (
        !deviceMeta ||
        !deviceMeta.sizes ||
        !deviceMeta.sizes.length ||
        !scrSizes[deviceMeta.sizes[0]]
      ) {
        return
      }
      const {
        W: width,
        H: height,
        SCR_X: scrX,
        SCR_Y: scrY,
        SCR_W: scrWidth,
        SCR_H: scrHeight,
      } = scrSizes[deviceMeta.sizes[0]]
      // TODO: Add FramePos
      // TODO: Mod ScreenshotPos with FramePos
      modFrameCanvasProps({
        width: width * scale,
        height: height * scale,
        headingPosX: (width * scale) / 2,
        frame: `/scr/${frameType}/${frameId}/${deviceMeta.sizes[0]}.png`,
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
      })
    },
    [modFrameCanvasProps, scale]
  )

  return (
    <div>
      <Head>
        <title>App Screenshot Generator</title>
      </Head>
      <hr />
      <form>
        <select onChange={eventFrame} defaultValue={defaultFrameId}>
          <optgroup label='iOS'>
            {scrMeta.ios.map((phone, key) => (
              <option key={key} data-type='ios' value={phone.id}>
                {phone.name}
              </option>
            ))}
          </optgroup>
          <optgroup label='Android'>
            {scrMeta.android.map((phone, key) => (
              <option key={key} data-type='android' value={phone.id}>
                {phone.name}
              </option>
            ))}
          </optgroup>
        </select>
        <input
          type='reset'
          onClick={() => updateFrameCanvasProps(frameDefaults)}
        />
        <hr />
        <section role='button' tabIndex='-1' onClick={eventPosition}>
          <button type='button' data-type='deg' data-value='-5'>
            Rot Left
          </button>
          <button
            type='button'
            data-type='y'
            data-value={`-${frameDefaults.height / 16}`}
          >
            Move Up
          </button>
          <button type='button' data-type='deg' data-value='5'>
            Rot Right
          </button>
          <br />
          <button
            type='button'
            data-type='x'
            data-value={`-${frameDefaults.width / 16}`}
          >
            Move Left
          </button>
          <button
            type='button'
            data-type='y'
            data-value={`${frameDefaults.height / 16}`}
          >
            Move Down
          </button>
          <button
            type='button'
            data-type='x'
            data-value={`${frameDefaults.width / 16}`}
          >
            Move Right
          </button>
        </section>
        <hr />
        <textarea
          placeholder='Heading'
          onChange={(e) => modFrameCanvasProps({ heading: e.target.value })}
        />
        <ColorPicker
          enableAlpha={false}
          defaultColor={frameDefaults.headingColor}
          color={frameCanvasProps.headingColor}
          onChange={({ color }) => modFrameCanvasProps({ headingColor: color })}
        >
          <span className='rc-color-picker-trigger' title='Heading Color' />
        </ColorPicker>
        <select
          defaultValue='Arial'
          onChange={(e) => modFrameCanvasProps({ headingFont: e.target.value })}
        >
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Roboto</option>
          <option>Open Sans</option>
          <option>Montserrat</option>
          <option>Poppin</option>
        </select>
        <select
          defaultValue='32'
          onChange={(e) => {
            const numValue = parseInt(e.target.value, 10)
            if (!isNaN(numValue) && isFinite(numValue)) {
              modFrameCanvasProps({
                headingSize: numValue || frameDefaults.headingSize,
                headingPosY: numValue || frameDefaults.headingPosY,
              })
            }
          }}
        >
          <option value='24'>Small</option>
          <option value='32'>Medium</option>
          <option value='40'>Large</option>
        </select>
      </form>
      <hr />
      <FrameCanvas
        ref={canvasRef}
        updateCanvasProps={modFrameCanvasProps}
        {...frameCanvasProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <hr />
    </div>
  )
}
