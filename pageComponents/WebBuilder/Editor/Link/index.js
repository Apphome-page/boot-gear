import { useCallback } from 'react'
import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useContextStore } from '../../../../components/Context'

import styles from './styles.module.scss'

export default function LinkEditor({ id, initHref, children, onChange }) {
  const [{ isPreview }] = useContextStore()
  const editAction = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const value = window.prompt('Link: ')
      onChange(value)
    },
    [onChange]
  )

  if (!isPreview) {
    return initHref ? <>{children}</> : <></>
  }

  return (
    <div className={styles.editorWrap}>
      <div
        id={id}
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
        onClick={editAction}
        onKeyDown={editAction}
      >
        <IconEdit className='w-100 h-100' />
      </div>
      {children}
    </div>
  )
}
