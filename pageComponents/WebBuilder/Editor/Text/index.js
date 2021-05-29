import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/beagle.min.css'

import { memo, useCallback, useEffect, useRef } from 'react'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useWebBuilderContext } from '../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../components/Context'

import getEditorConfig from './getEditorConfig'

import styles from './styles.module.scss'

const defaultButtons = [
  'h2',
  'h3',
  'bold',
  'italic',
  'underline',
  'subscript',
  'superscript',
  'orderedlist',
  'unorderedlist',
]

function TextEditor({
  keyName,
  placeholderText,
  buttons = defaultButtons,
  className,
}) {
  const editor = useRef(null)
  const editorRef = useRef(null)
  const editorWrapRef = useRef(null)

  const [{ isPreview }] = useContextStore()
  const [appKeyValue, setAppKeyValue] = useWebBuilderContext(keyName)

  const editAction = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  const editorInit = useCallback(async () => {
    // MediumEditor
    if (!editor.current) {
      const { default: MediumEditor } = await import('medium-editor')
      const mediumEdtiorConfig = getEditorConfig({
        buttons,
        relativeContainer: editorWrapRef.current,
        placeholderText,
      })
      editor.current = new MediumEditor(editorRef.current, mediumEdtiorConfig)
    } else {
      editor.current.destroy()
      editor.current.setup()
    }
    // MediumEditor Subscription
    editor.current.subscribe(
      'editableInput',
      debounce(() => {
        const content =
          editorRef.current.textContent === ''
            ? ''
            : editorRef.current.innerHTML
        setAppKeyValue(content)
      }),
      300
    )
  }, [buttons, placeholderText, setAppKeyValue])

  useEffect(() => {
    if (!editorRef.current) {
      return () => {}
    }
    editorInit()
    return () => {
      if (editor.current) {
        editor.current.destroy()
      }
    }
  }, [editorInit])

  if (!isPreview) {
    return (
      <div
        id={`container-${keyName}`}
        className={className}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: appKeyValue }}
      />
    )
  }

  // TODO: Handle initial value
  return (
    <div
      ref={editorWrapRef}
      className={classNames(className, styles.editorWrap)}
    >
      <div ref={editorRef} />
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
        onClick={editAction}
        onKeyDown={editAction}
      >
        <IconEdit className='w-100 h-100' />
      </div>
      <style global jsx>
        {`
          .static-toolbar {
            left: 50%;
            transform: translate(-50%, -120%);
            border-radius: 4px;
            filter: opacity(0.8);
          }
          .medium-editor-toolbar-actions {
            display: flex !important;
          }
          .medium-editor-toolbar-actions li {
            white-space: nowrap !important;
          }
          .medium-editor-toolbar-actions button {
            border-radius: 0px !important;
          }
        `}
      </style>
    </div>
  )
}

export default memo(TextEditor)
