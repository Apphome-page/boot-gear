import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/beagle.min.css'

import { useCallback, useEffect, useRef } from 'react'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import IconEdit from '@svg-icons/bootstrap/pencil-fill.svg'

import { useContextStore } from '../../../../components/Context'

import styles from './styles.module.scss'

const editorConfig = ({
  relativeContainer,
  buttons = [],
  placeholderText = '',
}) => ({
  toolbar: {
    buttons,
    static: true,
    updateOnEmptySelection: true,
    relativeContainer,
  },
  placeholder: {
    text: placeholderText,
    hideOnClick: false,
  },
  autoLink: false,
  imageDragging: false,
  spellcheck: false,
})

export default function TextEditor({
  id,
  initValue,
  placeholderText,
  buttons = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'orderedlist',
    'unorderedlist',
  ],
  className,
  onChange,
}) {
  const editor = useRef(null)
  const editorRef = useRef(null)
  const editorWrapRef = useRef(null)

  const [{ isPreview }] = useContextStore()

  const editAction = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  const editorInit = useCallback(async () => {
    if (!editor.current) {
      const { default: MediumEditor } = await import('medium-editor')
      const mediumEdtiorConfig = editorConfig({
        buttons,
        relativeContainer: editorWrapRef.current,
        placeholderText,
      })
      editor.current = new MediumEditor(editorRef.current, mediumEdtiorConfig)
    } else {
      editor.current.destroy()
      editor.current.setup()
    }
    // TODO: debounce
    editor.current.subscribe(
      'editableInput',
      debounce(() => {
        const content =
          editorRef.current.textContent === ''
            ? ''
            : editorRef.current.innerHTML
        onChange(content)
      }),
      300
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        className={className}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: initValue }}
      />
    )
  }

  return (
    <div
      ref={editorWrapRef}
      className={classNames(className, styles.editorWrap)}
    >
      <div ref={editorRef} />
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
          .medium-editor-toolbar-actions button {
            border-radius: 0px !important;
          }
        `}
      </style>
    </div>
  )
}
