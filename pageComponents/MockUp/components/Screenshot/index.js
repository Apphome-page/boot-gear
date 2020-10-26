import { FormFile } from 'react-bootstrap'

export default function Screenshot() {
  return (
    <FormFile
      id='scrFile'
      label='Upload a screenshot'
      accept='image/*'
      custom
    />
  )
}
