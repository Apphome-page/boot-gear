import { useRef, useState, useCallback } from 'react'
import Head from 'next/head'

import scrMeta from '../config/scrMeta.json'
import scrSizes from '../config/scrSizes.json'

import FrameCanvas from '../components/FrameCanvas'

import canvasText from '../helpers/canvasText'

const frameDefaults = {
  heading: '',
  headingColor: '#333',
  headingFont: 'Times New Roman',
  headingSize: 32,
  headingPosX: 0,
  headingPosY: 32,
  frame: '/scr/android/NEXUS5X_BLACK/nexus5x.png',
  framePosX: 0,
  framePosY: 0,
  frameWidth: 0,
  frameHeight: 0,
  frameRot: 0,
  screenshot: '/scr/default.png',
  screenshotPosX: 0,
  screenshotPosY: 0,
  screenshotWidth: 0,
  screenshotHeight: 0,
  screenshotRot: 0,
  width: 0,
  height: 0,
}

export default function AppScr() {
  const scale = 0.2
  const canvasRef = useRef(null)
  const [frameCanvasProps, updateFrameCanvasProps] = useState({
    ...frameDefaults,
  })

  const modFrameCanvasProps = useCallback(
    (deltaProps) => {
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
    },
    [updateFrameCanvasProps]
  )

  const eventInput = useCallback(
    (e) => {
      const { id } = e.target.dataset
      const numValue = parseInt(e.target.value, 10)
      switch (id) {
        case 'headingSize':
          if (!isNaN(numValue) && isFinite(numValue)) {
            modFrameCanvasProps({
              headingSize: numValue || frameDefaults.headingSize,
              headingPosY: numValue || frameDefaults.headingPosY,
            })
          }
          break
        default:
          modFrameCanvasProps({
            [id]: e.target.value || frameDefaults[id],
          })
          break
      }
    },
    [modFrameCanvasProps]
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
      const { id: frameId, type: frameType = 'android' } = e.target.options[
        e.target.selectedIndex
      ].dataset
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
    [modFrameCanvasProps]
  )

  return (
    <div>
      <Head>
        <title>App Screenshot Generator</title>
      </Head>
      <hr />
      <FrameCanvas
        ref={canvasRef}
        updateCanvasProps={modFrameCanvasProps}
        {...frameCanvasProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <hr />
      <select onBlur={eventFrame} defaultValue='none'>
        <option value='none' disabled hidden>
          Select Phone
        </option>
        <optgroup label='iOS'>
          {scrMeta.ios.map((phone, key) => (
            <option key={key} data-id={phone.id} data-type='ios'>
              {phone.name}
            </option>
          ))}
        </optgroup>
        <optgroup label='Android'>
          {scrMeta.android.map((phone, key) => (
            <option key={key} data-id={phone.id} data-type='android'>
              {phone.name}
            </option>
          ))}
        </optgroup>
      </select>
      <button
        type='button'
        onClick={() => updateFrameCanvasProps(frameDefaults)}
      >
        Reset
      </button>
      <hr />
      <section role='button' tabIndex='-1' onClick={eventPosition}>
        <button type='button' data-type='deg' data-value='-5'>
          Rot Left
        </button>
        <button type='button' data-type='y' data-value='-5'>
          Move Up
        </button>
        <button type='button' data-type='deg' data-value='5'>
          Rot Right
        </button>
        <br />
        <button type='button' data-type='x' data-value='-5'>
          Move Left
        </button>
        <button type='button' data-type='y' data-value='5'>
          Move Down
        </button>
        <button type='button' data-type='x' data-value='5'>
          Move Right
        </button>
      </section>
      <hr />
      <section onBlur={eventInput}>
        <label>
          heading
          <textarea data-id='heading' />
        </label>
        <label>
          headingColor
          <input data-id='headingColor' />
        </label>
        <label>
          headingFont
          <input data-id='headingFont' />
        </label>
        <label>
          headingSize
          <input data-id='headingSize' />
        </label>
      </section>
    </div>
  )
}
