import { useEffect, useContext } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'
import useUserData from '../../utils/useUserData'

export default function Subscription() {
  const [{ queueLoading, unqueueLoading }] = useContext(StoreContext)
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
        <div className='text-center'>
          <Button variant='alt'>View All Plans</Button>
        </div>
      </div>
    </>
  )
}
