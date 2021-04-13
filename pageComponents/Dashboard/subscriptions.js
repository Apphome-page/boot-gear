import { useEffect } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

import Link from '../../components/LinkTag'
import { useLoading } from '../../components/LoadingPop'
import { useUserData } from '../../components/LoginPop'

export default function Subscription() {
  const { queueLoading, unqueueLoading } = useLoading()
  const { firstLaunch, plan: { title: planTitle } = {} } = useUserData()

  useEffect(() => {
    const isPopped = !!firstLaunch
    if (isPopped) {
      queueLoading()
    }
    return () => {
      if (isPopped) {
        unqueueLoading()
      }
    }
  }, [firstLaunch, queueLoading, unqueueLoading])

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
        <Link href='/pricing'>
          <Button variant='alt' className='d-block my-3 mx-auto'>
            View All Plans
          </Button>
        </Link>
      </div>
    </>
  )
}
