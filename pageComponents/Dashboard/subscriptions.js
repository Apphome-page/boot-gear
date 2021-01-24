import { InputGroup, FormControl, Button } from 'react-bootstrap'

import useUserData from '../../utils/useUserData'

export default function Subscription() {
  const { plan: { title: planTitle } = {} } = useUserData()
  return (
    <>
      <div className='pb-1 mb-2 border-bottom lead text-dark'>
        Your Subscriptions
      </div>
      <div className='mb-5 p-2 border shadow-sm'>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Plan</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='plan' defaultValue={planTitle} disabled />
        </InputGroup>
        <div className='text-center'>
          <Button variant='secondary' className='btn-alt'>
            View All Plans
          </Button>
        </div>
      </div>
    </>
  )
}
