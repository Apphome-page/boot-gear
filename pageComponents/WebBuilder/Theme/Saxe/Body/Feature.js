import { Col } from 'react-bootstrap'
import classNames from 'classnames'

import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'
import { useContextStore } from '../../../../../components/Context'

import TextEditor from '../../../components/Editor/Text'

export default function Feature({ keyName, className, children }) {
  const [{ isPreview }] = useContextStore()
  const [keyValue] = useWebBuilderContext(keyName)

  if (!isPreview && !keyValue) {
    return <></>
  }

  return (
    <Col className={classNames('px-5', 'text-white', className)}>
      <div className='d-inline-block p-3 border border-light bg-white rounded-circle shadow'>
        {children}
      </div>
      <TextEditor
        keyName={keyName}
        className='m-3 text-dark'
        placeholderText='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      />
    </Col>
  )
}
