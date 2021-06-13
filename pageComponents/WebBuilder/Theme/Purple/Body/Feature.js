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
    <Col
      lg={4}
      className={classNames(
        'p-5',
        'lead',
        'text-white',
        'text-center',
        className
      )}
    >
      <div className='d-inline-block mb-1 text-white'>{children}</div>
      <TextEditor
        keyName={keyName}
        placeholderText='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      />
    </Col>
  )
}
