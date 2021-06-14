import { memo, createContext, useCallback, useContext, useState } from 'react'
import { Button, Form, FormControl, Modal, ModalBody } from 'react-bootstrap'

import classNames from 'classnames'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import styles from './styles.module.scss'

const LinkContext = createContext()

function Popup({ renderProps, onHide }) {
  const { show, title, defaultValue, onChange } = renderProps || {}
  return (
    <Modal show={show} onHide={onHide} backdrop>
      <Modal.Header closeButton>
        <span className='lead'>{title}</span>
      </Modal.Header>
      <ModalBody className='p-0'>
        <Form
          className='p-3 d-flex'
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onChange(event.target.elements.popValue.value)
            onHide()
          }}
        >
          <Form.Group className='my-0 mx-1 flex-fill' controlId='popValue'>
            <FormControl defaultValue={defaultValue} />
          </Form.Group>
          <Button className='mx-1' type='submit' variant='success'>
            Save
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

const MemoPopUp = memo(Popup)

export function LinkProvider({ children }) {
  const [popProps, setPopProps] = useState({ show: false })
  const getLink = useCallback((getLinkProps) => {
    setPopProps({ ...getLinkProps, show: true })
  }, [])
  const onPopHide = useCallback(() => {
    setPopProps({ show: false })
  }, [])
  return (
    <LinkContext.Provider value={getLink}>
      {children}
      <MemoPopUp renderProps={popProps} onHide={onPopHide} />
    </LinkContext.Provider>
  )
}

export function useLinkContext() {
  const getLink = useContext(LinkContext)
  return getLink
}

function LinkEditor({ keyName, children }) {
  const getLink = useContext(LinkContext)
  const [{ isPreview }] = useContextStore()
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)

  const changeAction = (event) => {
    event.preventDefault()
    event.stopPropagation()
    getLink({
      title: 'Link: ',
      defaultValue: appKeyValue,
      onChange: setAppKeyValue,
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
