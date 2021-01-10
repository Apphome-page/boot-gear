import { useState, useMemo, useCallback, useContext } from 'react'
import {
  Image,
  Button,
  Modal,
  ModalBody,
  Spinner,
  Alert,
} from 'react-bootstrap'
import Link from 'next/link'

import { StoreContext } from '../../../utils/storeProvider'
import useUserData from '../../../utils/useUserData'

import removeWebsite from '../helpers/removeWebsite'

import DomainSetup from './setup'
import DomainVerify from './verify'
import DomainNameserver from './nameserver'

const PLAN_SILVER = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const PLAN_GOLD = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD
const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

function LoadingSpinner() {
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

function PayAlert() {
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

export default function DashboardDomain({ show, handleClose, webKey } = {}) {
  const [{ firebase }] = useContext(StoreContext)
  const [isLoading, setLoading] = useState(false)

  const userPlan = useUserData('/plan_id')
  const userProduct = useUserData('/product_id')
  const webData = useUserData(`/sites/${webKey}`)

  const { appIcon, appName, webDomain, webHost } = webData || {}

  const removeDomain = useCallback(async () => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      setLoading(true)
      await removeWebsite({
        firebase,
        webKey,
        removeDomain: true,
        removeStorage: false,
      })
      window.alert('Removed custom Domain successfully')
    } catch (e) {
      window.alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [firebase, webKey])

  // Changes Modal Body based on conditions
  const DomainForm = useMemo(() => {
    const paidPlans = [PLAN_GOLD, PLAN_SILVER]
    const validPlan =
      paidPlans.includes(userPlan) || paidPlans.includes(userProduct)
    if (isLoading) {
      return LoadingSpinner
    }
    if (validPlan) {
      if (webDomain && !webHost) {
        return DomainVerify
      }
      if (webDomain && webHost) {
        return DomainNameserver
      }
      return DomainSetup
    }
    return PayAlert
  }, [isLoading, userPlan, userProduct, webDomain, webHost])

  return (
    <Modal
      animation
      backdrop='static'
      size='lg'
      show={show}
      onHide={handleClose}
    >
      <Modal.Footer className='py-1 justify-content-start bg-alt'>
        <Image
          src={`${FIRESTORE_BASE}${encodeURIComponent(appIcon)}?alt=media`}
          alt={webKey}
          height='48'
          width='48'
          className='mr-2 rounded'
        />
        <div className='lead text-white'>{appName}</div>
      </Modal.Footer>
      <ModalBody>
        <DomainForm webKey={webKey} webData={webData} />
      </ModalBody>
      <Modal.Header className='border-top py-2'>
        <Button
          size='sm'
          variant='light'
          className='border-0 text-primary rounded-0 bg-white'
          onClick={removeDomain}
        >
          Remove custom domain
        </Button>
        <Button
          size='sm'
          variant='light'
          className='rounded-0'
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Header>
    </Modal>
  )
}
