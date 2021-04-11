import { useCallback, useMemo, useEffect, useRef } from 'react'
import IconClose from '@svg-icons/bootstrap/x-circle.svg'
import noop from 'lodash/noop'

function variantToColor(variant) {
  let bgColor = '#ffffff'
  let color = '#000000'
  switch (variant) {
    case 'success':
      bgColor = '#28a745'
      color = '#ffffff'
      break
    case 'warning':
      bgColor = '#ffc107'
      color = '#000000'
      break
    case 'error':
    case 'danger':
      bgColor = '#dc3545'
      color = '#ffffff'
      break
    case 'info':
      bgColor = '#17a2b8'
      color = '#ffffff'
      break
    case 'light':
      bgColor = '#f8f9fa'
      color = '#000000'
      break
    case 'dark':
      bgColor = '#343a40'
      color = '#ffffff'
      break
    default:
      bgColor = '#17a2b8'
      color = '#ffffff'
      break
  }
  return { bgColor, color }
}

export default function AlertElement({
  id,
  children,
  variant,
  dismiss,
  timeout,
  callback = noop,
}) {
  const alertTimeoutRef = useRef(null)

  const { color: variantColor, bgColor: variantBgColor } = useMemo(
    () => variantToColor(variant),
    [variant]
  )

  const timeoutMs = timeout * 1000
  const timeoutDelay = useMemo(() => 0 * id + Math.random().toFixed(2), [id])

  const closeAlert = useCallback(() => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current)
      alertTimeoutRef.current = null
    }
    callback(id)
  }, [callback, id])

  useEffect(() => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current)
      alertTimeoutRef.current = null
    }
    if (dismiss) {
      alertTimeoutRef.current = setTimeout(() => {
        callback(id)
      }, timeoutMs)
    }

    return closeAlert
  }, [timeoutMs, dismiss, callback, id, closeAlert])

  return (
    <div className={`alert-element alert-element-${id}`}>
      {children}
      <IconClose
        className='alert-element-close'
        height='16'
        width='16'
        onClick={closeAlert}
      />
      <style jsx>{`
        @keyframes spin-attn {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-0.5deg);
          }
          75% {
            transform: rotate(0.5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .alert-element {
          position: relative;
          display: flex;
          left: 0;
          right: 0;
          min-height: 48px;
          margin: 4px;
          padding: 8px;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-family: monospace;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);
          animation: spin-attn 0.8s linear infinite;
        }
        .alert-element:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          height: 2px;
          width: 100%;
          opacity: 0.3;
        }
        .alert-element > :global(.alert-element-close) {
          margin-left: 8px;
          flex-grow: 0;
          flex-shrink: 0;
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        @keyframes timer-drop {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .alert-element {
          background-color: ${variantBgColor};
          color: ${variantColor};
          animation-delay: ${timeoutDelay};
        }
        .alert-element:before {
          background-color: ${dismiss ? variantColor : 'transparent'};
          animation: timer-drop ${timeout}s linear;
        }
      `}</style>
    </div>
  )
}
