import { InputGroup, FormControl, Button } from 'react-bootstrap'

import useUserData from '../../components/LoginPop/useUserData'

// Do not handle non-login cases
// Expect user to be logged in
// Break on any auth-issue
export default function Subscription() {
  const { data: userData } = useUserData()

  const {
    plan: { title: planTitle },
  } = userData || {}

  return (
    <>
      <div className='pb-1 mb-1 border-bottom lead text-dark'>
        Your Subscriptions
      </div>
      <div className='mb-5 p-3 border shadow-sm'>
        <InputGroup className='my-1'>
          <InputGroup.Prepend>
            <InputGroup.Text>Plan</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl name='plan' defaultValue={planTitle} disabled />
        </InputGroup>
        <div className='text-center'>
          <Button variant='alt'>View All Plans</Button>
        </div>
      </div>
    </>
  )
}
