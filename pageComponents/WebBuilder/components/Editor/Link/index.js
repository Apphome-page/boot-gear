import { memo } from 'react'

import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import { usePopContext, POPUP_TYPES } from '../../Context/Pop'

import styles from './styles.module.scss'

function LinkEditor({ keyName, keyTitle, children }) {
  const getPop = usePopContext()
  const [{ isPreview }] = useContextStore()
  const [appKeyValue] = useWebBuilderContext(keyName)

  const changeAction = (event) => {
    event.preventDefault()
    event.stopPropagation()
    getPop({
      title: keyTitle || 'Link: ',
      type: POPUP_TYPES.DEFAULT,
      keyName,
    })
  }

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
        onClick={changeAction}
        onKeyDown={changeAction}
      >
        <IconEdit className='w-100 h-100' />
      </div>
      {children}
    </div>
  )
}

export default memo(LinkEditor)
