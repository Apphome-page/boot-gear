import { useContext } from 'react'
import { FormFile } from 'react-bootstrap'

import { MockupContext } from '../../helpers/MockProvider'

export default function Screenshot() {
  const { modCurrent: modCurrentMockUp } = useContext(MockupContext)

  return (
    <FormFile
      id='scrFile'
      label='Upload a screenshot'
      accept='image/*'
      custom
      onChange={(e) =>
        modCurrentMockUp({
          screenshot: window.URL.createObjectURL(e.target.files[0]),
        })
      }
    />
  )
}
