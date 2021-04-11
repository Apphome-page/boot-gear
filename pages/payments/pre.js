import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'

import AuthWrapper from '../../components/AuthWrapper'
import { useAlerts } from '../../components/AlertPop'

import useUser from '../../components/LoginPop/useUser'
import useFireService from '../../components/LoginPop/useFireService'

const FIRECLOUD_USER_SYNC = process.env.NEXT_PUBLIC_FIRECLOUD_USER_SYNC
const PLAN_SILVER = process.env.NEXT_PUBLIC_PABBLY_CHECKOUT_SILVER
const PLAN_GOLD = process.env.NEXT_PUBLIC_PABBLY_CHECKOUT_GOLD

export default function Payment() {
  const router = useRouter()

  const { addAlert } = useAlerts()
  const { firstPromise: firstAuthPromise, data: userAuth } = useUser()
  const {
    firstPromise: firstFireServicePromise,
    data: fireAuth,
  } = useFireService('auth')

  const {
    query: { plan },
  } = router

  // TODO: run till login.
  const syncUser = useCallback(async () => {
    let checkoutLink = ''
    switch (plan) {
      case 'silver':
        checkoutLink = PLAN_SILVER
        break
      case 'gold':
        checkoutLink = PLAN_GOLD
        break
      default:
        break
    }
    if (!checkoutLink) {
      router.push('/pricing')
      return
    }
    await firstAuthPromise
    const userId = userAuth && userAuth.uid
    if (!userId) {
      return
    }
    const [idToken, { default: fetch }] = await Promise.all([
      userAuth.getIdToken(),
      import('cross-fetch'),
    ])
    try {
      const syncResp = await fetch(FIRECLOUD_USER_SYNC, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'content-type': 'application/json',
        },
      }) // Move to Pabbly Checkout using customerId
      const syncData = await syncResp.json()
      if (syncResp.status >= 400) {
        throw new Error(syncData)
      }
      window.location = `${checkoutLink}/?customer_id=${syncData.customerId}`
    } catch (e) {
      addAlert('Something went wrong. Please Sign in again to continue.', {
        variant: 'danger',
        autoDismiss: false,
      })

      await firstFireServicePromise
      fireAuth.signOut()
    }
  }, [
    addAlert,
    fireAuth,
    firstAuthPromise,
    firstFireServicePromise,
    plan,
    router,
    userAuth,
  ])

  useEffect(() => {
    syncUser()
  }, [syncUser])

  return (
    <Container className='min-vh-100 py-5 d-flex display-4 justify-content-center align-items-baseline text-dark'>
      <AuthWrapper>
        Validating
        <Spinner className='mx-3' animation='grow' variant='dark' />
      </AuthWrapper>
    </Container>
  )
}
