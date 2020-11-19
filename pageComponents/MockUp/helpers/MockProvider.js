import { useState, useCallback, createContext } from 'react'

import renderCanvas from '../../../utils/renderCanvas'

import frameTemplates from '../templates'

import {
  defaultProps as frameDefaultProps,
  getFrameProps,
  scaleFrameProps,
} from './defaults'

const maxHeight = 512

export const MockupContext = createContext(null)

export default function MockProvider({ children }) {
  const [currentMockUp, setCurrentMockUp] = useState(0)
  const [mockStore, setMockStore] = useState([frameDefaultProps(maxHeight)])

  const addMockStore = useCallback(() => {
    setMockStore((prevStore) => [
      ...prevStore,
      {
        ...frameDefaultProps(maxHeight),
        backgroundColor: `#${Math.random().toFixed(6).toString().slice(2)}`,
      },
    ])
  }, [])

  const removeMockStore = useCallback((mockIdx) => {
    setMockStore((prevStore) => {
      const newMockStore = [...prevStore]
      if (prevStore.length > 1) {
        newMockStore.splice(mockIdx, 1)
        setCurrentMockUp((prevCurrentMockUp) => {
          if (mockIdx <= prevCurrentMockUp && prevCurrentMockUp !== 0) {
            return prevCurrentMockUp - 1
          }
          return prevCurrentMockUp
        })
      }
      return newMockStore
    })
  }, [])

  const modMockStore = useCallback(
    (deltaStore) => {
      setMockStore((prevStore) => {
        const newStore = [...prevStore]
        const newCurrentStore = { ...newStore[currentMockUp], ...deltaStore }
        newStore[currentMockUp] = frameTemplates[
          newCurrentStore.template
        ].adjustProps(newCurrentStore)
        return newStore
      })
    },
    [currentMockUp]
  )

  const eventReset = useCallback(() => {
    const { frameId, frameType, frameDevice } = mockStore[currentMockUp]
    const resetProps = getFrameProps(frameType, frameId, {
      frameDevice,
      maxHeight,
    })
    resetProps.heading = ''
    resetProps.screenshot = '/scr/default.png'
    modMockStore(resetProps)
  }, [modMockStore, mockStore, currentMockUp])

  const eventSave = useCallback(async () => {
    const mockPromise = mockStore.map(async (currentMockStore) => {
      const {
        frameId,
        frameType,
        frameDevice,
        width,
        height,
      } = currentMockStore
      const {
        width: originalWidth,
        height: originalHeight,
      } = getFrameProps(frameType, frameId, { frameDevice })

      const scale = Math.max(originalWidth / width, originalHeight / height)

      const fullFrameProps = {
        ...currentMockStore,
        ...scaleFrameProps(currentMockStore, scale),
      }

      fullFrameProps.headingSize =
        (fullFrameProps.headingSize * fullFrameProps.height) / maxHeight
      fullFrameProps.headingPosY = fullFrameProps.headingSize + 16

      const adjustedFrameProps = frameTemplates[
        fullFrameProps.template
      ].adjustProps(fullFrameProps)

      const canvasObj = Object.assign(document.createElement('canvas'), {
        height: adjustedFrameProps.height,
        width: adjustedFrameProps.width,
      })

      await renderCanvas(canvasObj.getContext('2d'), adjustedFrameProps)

      const canvasBlob = await new Promise((resolve) => {
        canvasObj.toBlob(resolve)
      })
      return canvasBlob
    })

    const [{ default: JSZip }, { saveAs }, ...mockCanvas] = await Promise.all(
      [import('jszip'), import('file-saver')].concat(mockPromise)
    )

    const zip = new JSZip()
    mockCanvas.forEach((mCanvas, mIndex) => {
      zip.file(`${mIndex}.png`, mCanvas)
    })

    const zipBundle = await zip.generateAsync({
      type: 'blob',
    })

    saveAs(zipBundle, 'AppScreenshots.zip')
  }, [mockStore])

  return (
    <MockupContext.Provider
      value={{
        data: mockStore,
        current: currentMockUp,
        add: addMockStore,
        remove: removeMockStore,
        modCurrent: modMockStore,
        setCurrent: setCurrentMockUp,
        eventReset,
        eventSave,
      }}
    >
      {children}
    </MockupContext.Provider>
  )
}
