import { useRef, useState, useCallback } from 'react'
import ColorPicker from 'rc-color-picker'

import scrBg from '../../config/scrBg.json'
import scrMeta from '../../config/scrMeta.json'

import FrameCanvas from '../FrameCanvas'
import frameTemplates from '../FrameCanvas/templates'
import {
  defaultProps as frameDefaultProps,
  defaultFrameId,
  getFrameProps,
} from '../FrameCanvas/defaults'

const maxHeight = 512
const frameDefaults = frameDefaultProps(maxHeight)

export default function FrameTemplateSingle() {
  const canvasRef = useRef(null)
  const [frameCanvasProps, updateFrameCanvasProps] = useState({
    ...frameDefaults,
  })

  const modFrameCanvasProps = useCallback((deltaProps) => {
    updateFrameCanvasProps((prevFrameCanvasProps) => {
      const newProps = {
        ...prevFrameCanvasProps,
        ...deltaProps,
      }
      return frameTemplates[newProps.template].adjustProps(newProps)
    })
  }, [])

  const eventTemplate = useCallback(
    (e) => {
      const { frameType, frameId } = frameCanvasProps
      modFrameCanvasProps({
        ...getFrameProps(frameType, frameId, { maxHeight }),
        template: e.target.value,
      })
    },
    [frameCanvasProps, modFrameCanvasProps]
  )

  const eventFrame = useCallback(
    (e) => {
      modFrameCanvasProps(
        getFrameProps(
          e.target.options[e.target.selectedIndex].dataset.type || 'android',
          e.target.value,
          { maxHeight }
        )
      )
    },
    [modFrameCanvasProps]
  )

  return (
    <>
      <div className='row mw-1024'>
        <form className='col-lg-8 align-self-center text-center'>
          <div className='custom-file text-left'>
            <input
              type='file'
              className='custom-file-input'
              id='scrFile'
              name='scrFile'
              accept='image/*'
              onChange={(e) =>
                modFrameCanvasProps({
                  screenshot: window.URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <label className='custom-file-label' htmlFor='scrFile'>
              Upload a screenshot
            </label>
          </div>
          <div className='row my-3'>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Template</header>
              </div>
              <select
                className='form-control'
                defaultValue={frameCanvasProps.template}
                onChange={eventTemplate}
              >
                {Object.keys(frameTemplates).map((fTemplate, fIndex) => (
                  <option value={fTemplate} key={fIndex}>
                    {frameTemplates[fTemplate].name}
                  </option>
                ))}
              </select>
            </section>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Device</header>
              </div>
              <select
                className='form-control'
                onChange={eventFrame}
                defaultValue={defaultFrameId}
              >
                <optgroup label='Android'>
                  {scrMeta.android.map((phone, key) => (
                    <option key={key} data-type='android' value={phone.id}>
                      {phone.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label='iOS'>
                  {scrMeta.ios.map((phone, key) => (
                    <option key={key} data-type='ios' value={phone.id}>
                      {phone.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </section>
          </div>
          <hr />
          <section className='input-group'>
            <div className='input-group-prepend'>
              <header className='input-group-text'>Caption</header>
            </div>
            <textarea
              className='form-control'
              placeholder='Add Caption Here'
              onChange={(e) => modFrameCanvasProps({ heading: e.target.value })}
            />
          </section>

          <div className='row my-3'>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Font Size</header>
              </div>
              <select
                className='form-control'
                defaultValue={frameDefaults.headingSize}
                onChange={(e) => {
                  const numValue = parseInt(e.target.value, 10)
                  if (!isNaN(numValue) && isFinite(numValue)) {
                    modFrameCanvasProps({
                      headingSize: numValue || frameDefaults.headingSize,
                      headingPosY: 16 + (numValue || frameDefaults.headingPosY),
                    })
                  }
                }}
              >
                <option value='18'>Small</option>
                <option value='24'>Medium</option>
                <option value='28'>Large</option>
              </select>
            </section>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Font Family</header>
              </div>
              <select
                className='form-control'
                defaultValue='Arial'
                onChange={(e) =>
                  modFrameCanvasProps({ headingFont: e.target.value })
                }
              >
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Montserrat</option>
                <option>Poppin</option>
              </select>
            </section>
          </div>

          <div className='row my-3'>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Font Weight</header>
              </div>
              <select className='form-control'>
                <option value='400'>Light</option>
                <option value='600'>Normal</option>
                <option value='800'>Bold</option>
              </select>
            </section>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Font Color</header>
              </div>
              <input
                type='text'
                readOnly
                className='form-control'
                placeholder={frameDefaults.headingColor}
                value={frameCanvasProps.headingColor}
                aria-label='Heading Color'
              />
              <div className='input-group-append'>
                <ColorPicker
                  className='input-group-text p-0'
                  enableAlpha={false}
                  defaultColor={frameDefaults.headingColor}
                  color={frameCanvasProps.headingColor}
                  onChange={({ color }) =>
                    modFrameCanvasProps({ headingColor: color })
                  }
                >
                  <footer className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                </ColorPicker>
              </div>
            </section>
          </div>
          <hr />
          <div className='row my-3'>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>
                  Background Template
                </header>
              </div>
              <select
                className='form-control'
                onChange={(e) => {
                  modFrameCanvasProps({
                    backgroundImage: `/scr/bg/${e.target.value}`,
                  })
                }}
              >
                <option value=''>None</option>
                {scrBg.map(({ path }, index) => (
                  <option value={path} key={index}>
                    {`Option ${index}`}
                  </option>
                ))}
              </select>
            </section>
            <section className='col-6 input-group'>
              <div className='input-group-prepend'>
                <header className='input-group-text'>Background Color</header>
              </div>
              <input
                type='text'
                readOnly
                className='form-control'
                placeholder={frameDefaults.backgroundColor}
                value={frameCanvasProps.backgroundColor}
                aria-label='Background Color'
              />
              <div className='input-group-append'>
                <ColorPicker
                  className='input-group-text p-0'
                  enableAlpha={false}
                  defaultColor={frameDefaults.backgroundColor}
                  color={frameCanvasProps.backgroundColor}
                  onChange={({ color }) =>
                    modFrameCanvasProps({ backgroundColor: color })
                  }
                >
                  <footer className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
                </ColorPicker>
              </div>
            </section>
            <div className='custom-file m-3 text-left'>
              <input
                type='file'
                className='custom-file-input'
                id='scrBgFile'
                name='scrBgFile'
                accept='image/*'
                onChange={(e) => {
                  modFrameCanvasProps({
                    backgroundImage: window.URL.createObjectURL(
                      e.target.files[0]
                    ),
                  })
                }}
              />
              <label className='custom-file-label' htmlFor='scrBgFile'>
                Upload Background Image
              </label>
            </div>
          </div>
          <hr />
          <div className='row my-3'>
            <div className='col-6'>
              <input
                className='w-100 btn btn-info'
                type='reset'
                onClick={() => updateFrameCanvasProps(frameDefaults)}
                value='Reset'
              />
            </div>
            <div className='col-6'>
              <input
                className='w-100 btn btn-success'
                type='button'
                onClick={() => updateFrameCanvasProps(frameDefaults)}
                value='Save'
              />
            </div>
          </div>
        </form>
        <section className='col-lg-4 align-self-center text-center my-3 fh-512'>
          <FrameCanvas
            ref={canvasRef}
            updateCanvasProps={modFrameCanvasProps}
            style={{ boxShadow: '#CCC 0px 0px 32px' }}
            {...frameCanvasProps} // eslint-disable-line react/jsx-props-no-spreading
          />
        </section>
      </div>
    </>
  )
}
