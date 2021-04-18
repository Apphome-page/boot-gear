import { useState, useCallback, useMemo, useRef, forwardRef } from 'react'
import { Image } from 'react-bootstrap'
import classNames from 'classnames'
import noop from 'lodash/noop'

const FileInput = forwardRef(
  (
    {
      id = '',
      name = '',
      label = 'Select or Drop Here',
      accept = '*/*',
      onChange = noop,
      className = '',
      inputClassName = '',
      size = 128,
      required = false,
      disabled = false,
      defaultValue,
    },
    parentInputRef
  ) => {
    const [fileURI, setFileURI] = useState(null)

    const freshRef = useRef(null)
    const inputRef = useMemo(() => parentInputRef || freshRef, [parentInputRef])

    const defaultValueURL = useMemo(
      () =>
        (typeof window !== 'undefined' &&
          defaultValue instanceof File &&
          window.URL.createObjectURL(defaultValue)) ||
        null,
      [defaultValue]
    )

    const onChangeCb = useCallback(
      (event) => {
        event.preventDefault()
        event.stopPropagation()
        try {
          setFileURI(window.URL.createObjectURL(inputRef.current.files[0]))
        } catch (err) {
          setFileURI(null)
        }
        onChange()
      },
      [inputRef, onChange]
    )

    const viewClassName = classNames(
      'position-absolute',
      'h-100',
      'w-100',
      'cursor-pointer',
      inputClassName
    )
    return (
      <div
        label={fileURI ? 'Change' : label}
        className={classNames(
          'position-relative',
          'd-inline-flex',
          'align-items-center',
          'justify-content-center',
          'rounded',
          'bg-light',
          'cursor-pointer',
          'file-input-wrap',
          className
        )}
      >
<<<<<<< HEAD
        {fileURI || defaultValueURL ? (
          <Image
            src={fileURI || defaultValueURL}
=======
        {fileURI ? (
          <Image
            src={fileURI}
>>>>>>> f5ed3c92e4d8fedb71ecfc74f365e04056777e66
            className={classNames('file-input-img', viewClassName)}
          />
        ) : (
          ''
        )}
        <input
          id={id}
          name={name}
          type='file'
          ref={inputRef}
          accept={accept}
          aria-label={label}
          required={required}
          disabled={disabled}
          className={classNames('file-input-drop', viewClassName)}
          onChange={onChangeCb}
          defaultValue={defaultValue}
        />
        <style jsx>
          {`
            .file-input-wrap {
              height: ${size}px;
              width: ${size}px;
            }
            .file-input-wrap:after {
              content: '${label}';
              font-size: ${size / 8}px;
            }
          `}
        </style>
        <style jsx>
          {`
            .file-input-wrap:before {
              content: '';
              position: absolute;
              top: 12px;
              bottom: 12px;
              left: 12px;
              right: 12px;
              border: 1px dashed #999999;
              z-index: 1;
            }
            .file-input-wrap:after {
              margin: 12px;
              padding: 4px;
              border-radius: 4px;
              font-family: monospace;
              line-height: 1;
              color: #666666;
              background-color: rgba(238, 238, 238, 0.6);
              z-index: 3;
            }
            .file-input-wrap .file-input-img {
              padding: 12px;
              object-fit: cover;
              z-index: 2;
            }
            .file-input-wrap .file-input-drop {
              opacity: 0;
              z-index: 4;
            }
          `}
        </style>
      </div>
    )
  }
)
FileInput.displayName = 'FileInput'

export default FileInput
