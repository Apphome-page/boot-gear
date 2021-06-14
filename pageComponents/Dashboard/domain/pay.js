import { Alert, Button } from 'react-bootstrap'

import Link from '../../../components/LinkTag'

export default function PayAlert() {
  return (
    <>
      <Alert variant='info' className='mx-auto mt-5 mb-1 lead text-center'>
        Buy a Paid Plan to begin adding your custom domain!
      </Alert>
      <Link href='/pricing'>
        <Button block variant='alt' className='mt-1 mb-5 mx-auto w-75'>
          View Plans
        </Button>
      </Link>
    </>
  )
}
