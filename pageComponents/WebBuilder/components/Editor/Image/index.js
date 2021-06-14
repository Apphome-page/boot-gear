import { memo, useCallback, useRef, useMemo } from 'react'
import { Image } from 'react-bootstrap'
import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import addLinkProtocol from '../../../helpers/addLinkProtocol'

import styles from './styles.module.scss'

const placeholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg=='

function ImageEditor({
  keyName,
  className,
  height,
  width,
  alt = `Image for ${keyName}`,
}) {
  const inputRef = useRef(null)

  const [{ isPreview }] = useContextStore()
  const [rawAppKeyValue, setRawAppKeyValue] = useWebBuilderContext(keyName)

  const appKeyValue = useMemo(() => {
    if (typeof window !== 'undefined' && rawAppKeyValue instanceof File) {
      return window.URL.createObjectURL(rawAppKeyValue)
    }
    if (!isPreview && rawAppKeyValue) {
      return rawAppKeyValue
    }
    return rawAppKeyValue || placeholderImage
  }, [isPreview, rawAppKeyValue])

  const onChange = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      let updatedFile = null
      try {
        // eslint-disable-next-line prefer-destructuring
        updatedFile = inputRef.current.files[0]
      } catch (err) {
        //
      }
      setRawAppKeyValue(updatedFile)
    },
    [setRawAppKeyValue]
  )

  if (!isPreview) {
    return rawAppKeyValue ? (
      <Image
        id={`container-${keyName}`}
        src={addLinkProtocol(appKeyValue)}
        alt={alt}
        className={classNames(className, styles.fileInputImage)}
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
        src={appKeyValue}
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
        id={`container-${keyName}`}
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
        onChange={onChange}
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

export default memo(ImageEditor)
