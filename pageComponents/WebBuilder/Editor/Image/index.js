import { useState, useCallback, useRef } from 'react'
import { Image } from 'react-bootstrap'
import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useContextStore } from '../../../../components/Context'

import styles from './styles.module.scss'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

const placeholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg=='

export default function ImageEditor({
  id,
  defaultValue,
  alt = '',
  className,
  height,
  width,
  onChange,
}) {
  const inputRef = useRef(null)

  const [{ isPreview }] = useContextStore()

  const [fileURI, setFileURI] = useState(() => {
    if (typeof window === 'undefined') {
      return placeholderImage
    }
    if (defaultValue instanceof File) {
      return window.URL.createObjectURL(defaultValue)
    }
    if (defaultValue) {
      return `${SITE_URL}/${defaultValue}`
    }
    return placeholderImage
  })

  const onChangeCb = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      let updatedFile = null
      let updatedFileURI = null
      try {
        // eslint-disable-next-line prefer-destructuring
        updatedFile = inputRef.current.files[0]
        updatedFileURI = window.URL.createObjectURL(updatedFile)
      } catch (err) {
        //
      }
      setFileURI(updatedFileURI)
      if (onChange) {
        onChange(updatedFile)
      }
    },
    [inputRef, onChange]
  )

  if (!isPreview) {
    return fileURI ? (
      <Image
        id={id}
        loading='lazy'
        src={fileURI}
        alt={alt}
        className={className}
        height={height}
        width={width}
      />
    ) : (
      <></>
    )
  }

  return (
    <div
      className={classNames(
        'position-relative',
        'd-inline-flex',
        'align-items-center',
        'justify-content-center',
        'w-100',
        'h-100',
        'overflow-hidden',
        'cursor-pointer',
        styles.fileInputWrap
      )}
    >
      <Image
        src={fileURI}
        alt={alt}
        height={height}
        width={width}
        className={classNames(
          'cursor-pointer',
          className,
          styles.fileInputImage
        )}
      />
      <input
        id={id}
        type='file'
        ref={inputRef}
        accept='image/*'
        className={classNames(
          'position-absolute',
          'h-100',
          'w-100',
          'cursor-pointer',
          styles.fileInputDrop
        )}
        onChange={onChangeCb}
        defaultValue={defaultValue}
      />
      <div
        className={classNames(
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'p-1',
          'text-white',
          'bg-primary',
          'rounded-lg',
          styles.editorIcon
        )}
      >
        <IconEdit className='w-100 h-100' />
      </div>
    </div>
  )
}
