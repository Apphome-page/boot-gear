/* eslint-disable no-param-reassign */
import { useState, useEffect, useCallback, useRef } from 'react'
import { Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import render from '../../utils/renderCanvas'

// TODO:
const debouncedRender = () =>
  debounce(async (canvas, props, setLoading) => {
    if (!canvas) {
      return
    }
    canvas.width = props.width
    canvas.height = props.height
    setLoading(true)
    await render(canvas.getContext('2d'), props)
    setLoading(false)
  }, 100)

export default function FrameCanvas({ renderProps, className, ...restProps }) {
  const { width = 0, height = 0 } = renderProps
  const canvasRef = useRef(null)
  const [isLoading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canvasRender = useCallback(debouncedRender(), [])

  useEffect(() => {
    canvasRender(canvasRef.current, renderProps, setLoading)
  }, [renderProps, canvasRender])

  return (
    <div
      className={classNames('mx-1', 'd-inline-block', 'position-relative', {
        [className]: className,
      })}
      style={{ height: `${height}px` }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <canvas ref={canvasRef} />
      <div
        className={classNames('canvas-loader', {
          'd-none': !isLoading,
        })}
      >
        <Spinner animation='border' variant='light' />
      </div>
      <style jsx>
        {`
          .canvas-loader {
            width: ${width}px;
          }
        `}
      </style>
      <style jsx>
        {`
          .canvas-loader {
            display: flex;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            align-items: center;
            justify-content: center;
            background-color: #000d;
          }
        `}
      </style>
    </div>
  )
}
