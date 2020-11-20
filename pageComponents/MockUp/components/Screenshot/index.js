import { useContext } from 'react'
import { FormFile } from 'react-bootstrap'

import { MockupContext } from '../../helpers/MockProvider'

export default function Design() {
  const { modCurrent: modCurrentMockUp } = useContext(MockupContext)

  return (
    <FormFile
      id='scrFile'
      className='m-1 mt-3'
      label='Upload a screenshot'
      accept='image/*'
      custom
      onChange={(e) => {
        modCurrentMockUp({
          screenshot: window.URL.createObjectURL(e.target.files[0]),
        })
        e.target.value = ''
      }}
    />
  )
}
