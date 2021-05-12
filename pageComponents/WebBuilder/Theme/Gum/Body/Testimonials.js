import { useCallback } from 'react'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import TextEditor from '../../../Editor/Text'

const textEditorButtons = []

export default function Testimonials() {
  const [appTestimValue, setAppTestim] = useWebBuilderContext('appTestim')

  const changeAction = useCallback(
    (value, { type, index }) => {
      setAppTestim((prevAppTestimValue) => {
        const newAppTestimValue = [...prevAppTestimValue]
        const currentTestimValue = {
          ...newAppTestimValue[index],
          [type]: value,
        }
        newAppTestimValue[index] = currentTestimValue
        return newAppTestimValue
      })
    },
    [setAppTestim]
  )

  if (!appTestimValue || !appTestimValue.length) {
    return <div id='container-testimonials' />
  }

  return (
    <div id='container-appTestim' className='container py-5'>
      <h2 className='my-5 text-center'>Testimonials</h2>
      <ul className='row'>
        {appTestimValue.map(({ text, source }, index) => (
          <li key={index} className='col-lg-6'>
            <blockquote className='blockquote'>
              <TextEditor
                className='mb-0'
                initText={text}
                buttons={textEditorButtons}
                onChange={(value) => {
                  changeAction(value, { type: 'text', index })
                }}
              />
              <footer className='blockquote-footer'>
                <cite title={source}>
                  <TextEditor
                    initText={text}
                    buttons={textEditorButtons}
                    onChange={(value) => {
                      changeAction(value, { type: 'source', index })
                    }}
                  />
                </cite>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
