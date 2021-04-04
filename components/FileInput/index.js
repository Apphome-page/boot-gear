import { useState, useCallback, useMemo, useRef, forwardRef } from 'react'
import classNames from 'classnames'

import { InputWrap, InputPreview, InputDrop } from './style'

const FileInput = forwardRef(
  (
    {
      id = '',
      name = '',
      label = 'Select or Drop Here',
      accept = '*/*',
      onChange = () => {},
      className = '',
      inputClassName = '',
      size = 128,
      required = false,
      disabled = false,
    },
    parentInputRef
  ) => {
    const [fileURI, setFileURI] = useState(null)

    const freshRef = useRef(null)
    const inputRef = useMemo(() => parentInputRef || freshRef, [parentInputRef])

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
      <InputWrap
        label={fileURI ? 'Change' : label}
        size={size}
        className={classNames(
          'position-relative',
          'd-inline-flex',
          'align-items-center',
          'justify-content-center',
          'rounded',
          'bg-light',
          'cursor-pointer',
          className
        )}
      >
        {fileURI ? (
          <InputPreview src={fileURI} className={viewClassName} />
        ) : (
          ''
        )}
        <InputDrop
          id={id}
          name={name}
          type='file'
          ref={inputRef}
          accept={accept}
          aria-label={label}
          required={required}
          disabled={disabled}
          className={viewClassName}
          onChange={onChangeCb}
        />
      </InputWrap>
    )
  }
)
FileInput.displayName = 'FileInput'

export default FileInput
