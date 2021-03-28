import { Alert, Spinner } from 'react-bootstrap'

export default function RemoveLoading() {
  return (
    <>
      <Alert variant='info' className='lead text-center'>
        Removing custom Domain
      </Alert>
      <Spinner
        animation='grow'
        variant='dark'
        className='d-block my-5 mx-auto text-center bg-alt'
      />
    </>
  )
}
