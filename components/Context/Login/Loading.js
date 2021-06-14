import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <Spinner
      className='d-block mx-auto my-3 p-3'
      animation='border'
      variant='warning'
    />
  )
}
