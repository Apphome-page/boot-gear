import { createContext, useState, useCallback, useContext } from 'react'
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'

import TextEditor from '../Editor/Text'

const PopContext = createContext()

export function NavPageProvider({ children }) {
  const [{ keyName, placeholderText, title, show }, setPopProps] = useState({
    show: false,
  })
  const getPopValue = useCallback((popData) => {
    setPopProps({ ...popData, show: true })
  }, [])
  const hideAction = useCallback(() => {
    setPopProps({
      show: false,
    })
  }, [])
  return (
    <PopContext.Provider value={getPopValue}>
      {children}
      <Modal show={show} onHide={hideAction} backdrop size='lg'>
        <Modal.Header closeButton>{title}</Modal.Header>
        <ModalBody className='m-3 p-3 border'>
          <TextEditor keyName={keyName} placeholderText={placeholderText} />
        </ModalBody>
        <ModalFooter className='justify-content-start mini text-warning'>
          * Content is saved as you edit
        </ModalFooter>
      </Modal>
    </PopContext.Provider>
  )
}

export default function NavPage({ keyName, keyTitle, keyDesc }) {
  const getPopvalue = useContext(PopContext)
  const [appKeyValue] = useWebBuilderContext(keyName)

  const clickAction = () => {
    getPopvalue({
      title: keyTitle,
      keyName,
    })
  }

  return (
    <div
      tabIndex='-1'
      role='button'
      className={classNames('my-1', 'ml-3', 'text-nowrap', 'text-truncate', {
        'text-success': appKeyValue,
        'text-warning': !appKeyValue,
      })}
      title={keyDesc}
      onClick={clickAction}
      onKeyDown={clickAction}
    >
      {keyTitle}
    </div>
  )
}
