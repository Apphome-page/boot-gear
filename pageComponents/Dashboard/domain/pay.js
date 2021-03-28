import Link from 'next/link'
import { Alert, Button } from 'react-bootstrap'

export default function PayAlert() {
  return (
    <>
      <Alert variant='info' className='mx-auto mt-5 mb-2 lead text-center'>
        Buy a Paid Plan to begin adding your custom domain!
      </Alert>
      <Link href='/pricing'>
        <Button
          block
          variant='secondary'
          className='mt-2 mb-5 mx-auto w-75 btn-alt'
        >
          View Plans
        </Button>
      </Link>
    </>
  )
}
