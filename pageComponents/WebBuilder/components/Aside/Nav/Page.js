import { useState, useCallback, memo } from 'react'
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../Editor/Text'

import webBuilderPageKeys from './config/pageKeys.json'

function RawNavPage({ keyName, keyTitle, keyDesc, keyAction }) {
  const [appKeyValue] = useWebBuilderContext(keyName)

  const clickAction = () => {
    keyAction({
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

const NavPage = memo(RawNavPage)

export default function NavPageWrap() {
  const [{ keyName, placeholderText, title, show }, setPopProps] = useState({
    show: false,
  })

  const keyAction = useCallback((popData) => {
    setPopProps({ ...popData, show: true })
  }, [])

  const hideAction = useCallback(() => {
    setPopProps({
      show: false,
    })
  }, [])

  return (
    <>
      {webBuilderPageKeys.map(([atomKey, atomTitle, atomDesc]) => (
        <NavPage
          key={atomKey}
          keyName={atomKey}
          keyTitle={atomTitle}
          keyDesc={atomDesc}
          keyAction={keyAction}
        />
      ))}
      <Modal show={show} onHide={hideAction} backdrop size='lg'>
        <Modal.Header closeButton>{title}</Modal.Header>
        <ModalBody className='m-3 p-3 border'>
          <TextEditor keyName={keyName} placeholderText={placeholderText} />
        </ModalBody>
        <ModalFooter className='justify-content-start mini text-warning'>
          * Content is saved as you edit
        </ModalFooter>
      </Modal>
    </>
  )
}
