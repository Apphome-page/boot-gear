import {
  memo,
  createContext,
  useCallback,
  useContext,
  useState,
  Fragment,
  useEffect,
} from 'react'
import { Button, Form, FormControl, Modal, ModalBody } from 'react-bootstrap'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import removeTags from '../../../../../utils/removeTags'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../Editor/Text'

const PopContext = createContext()

export const POPUP_TYPES = Object.freeze({
  TEXT: 'text',
  TEXT_AREA: 'textarea',
  DEFAULT: 'default',
})

function PopupTextArea({ keyName, onComplete }) {
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const saveAction = useCallback(() => {
    const saveValue = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const rawSaveValue = removeTags(saveValue).replace(/\s/gi, '')
    setAppKeyValue(rawSaveValue ? saveValue : null)
    onComplete()
  }, [editorState, onComplete, setAppKeyValue])
  useEffect(() => {
    if (appKeyValue) {
      const contentBlock = htmlToDraft(appKeyValue)
      if (contentBlock) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(contentBlock.contentBlocks)
          )
        )
      }
    }
  }, [appKeyValue])
  return (
    <div className='p-3 bg-light'>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorClassName='px-3 bg-white shadow'
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'textAlign'],
        }}
      />
      <Button
        variant='success'
        size='lg'
        className='my-3 w-100 rounded-0'
        onClick={saveAction}
      >
        Save
      </Button>
    </div>
  )
}

function PopupText({ keyName, placeholderText }) {
  return (
    <div className='m-3 p-3 border'>
      <TextEditor keyName={keyName} placeholderText={placeholderText} />
    </div>
  )
}

function PopupDefault({ keyName, onComplete }) {
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)
  return (
    <Form
      className='p-3 d-flex'
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setAppKeyValue(event.target.elements.popValue.value)
        onComplete()
      }}
    >
      <Form.Group className='my-0 mx-1 flex-fill' controlId='popValue'>
        <FormControl defaultValue={appKeyValue} />
      </Form.Group>
      <Button className='mx-1' type='submit' variant='success'>
        Save
      </Button>
    </Form>
  )
}

function Popup({ renderProps, onHide }) {
  const { show, title, type, placeholder, keyName } = renderProps || {}
  let PopupBody = Fragment
  switch (type) {
    case POPUP_TYPES.TEXT:
      PopupBody = PopupText
      break
    case POPUP_TYPES.TEXT_AREA:
      PopupBody = PopupTextArea
      break
    case POPUP_TYPES.DEFAULT:
      PopupBody = PopupDefault
      break
    default:
      PopupBody = Fragment
      break
  }
  return (
    <Modal show={show} onHide={onHide} size='lg' backdrop='static'>
      <Modal.Header closeButton>
        <span className='lead'>{title}</span>
      </Modal.Header>
      <ModalBody className='p-0'>
        <PopupBody
          keyName={keyName}
          placeholderText={placeholder}
          onComplete={onHide}
        />
      </ModalBody>
    </Modal>
  )
}

const MemoPopUp = memo(Popup)

export default function PopProvider({ children }) {
  const [popProps, setPopProps] = useState({ show: false })
  const getPop = useCallback((getPopProps) => {
    setPopProps({ ...getPopProps, show: true })
  }, [])
  const onPopHide = useCallback(() => {
    setPopProps({ show: false })
  }, [])
  return (
    <PopContext.Provider value={getPop}>
      {children}
      <MemoPopUp renderProps={popProps} onHide={onPopHide} />
    </PopContext.Provider>
  )
}

export function usePopContext() {
  const getPop = useContext(PopContext)
  return getPop
}
