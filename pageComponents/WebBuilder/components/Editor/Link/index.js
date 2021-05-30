import { memo, useCallback } from 'react'
import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import styles from './styles.module.scss'

function LinkEditor({ keyName, children }) {
  const [{ isPreview }] = useContextStore()
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)

  const onChange = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const value = window.prompt('Link: ')
      setAppKeyValue(value || '')
    },
    [setAppKeyValue]
  )

  if (!isPreview) {
    return appKeyValue ? <>{children}</> : <></>
  }

  return (
    <div className={styles.editorWrap}>
      <div
        id={`container-${keyName}`}
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
        tabIndex='-1'
        role='button'
        onClick={onChange}
        onKeyDown={onChange}
      >
        <IconEdit className='w-100 h-100' />
      </div>
      {children}
    </div>
  )
}

export default memo(LinkEditor)
