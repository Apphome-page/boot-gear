import { useState, useMemo, useCallback, useContext } from 'react'
import { Button, Image, Modal, ModalBody } from 'react-bootstrap'
import { useFirebaseApp } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { StoreContext } from '../../../utils/storeProvider'
import useUserData from '../../../utils/useUserData'

import removeWebsite from '../helpers/removeWebsite'

import DomainSetup from './setup'
import DomainVerify from './verify'
import DomainNameserver from './nameserver'
import RemoveLoading from './removeLoading'
import PayInfo from './pay'

const PLAN_SILVER = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const PLAN_GOLD = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD
const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function DashboardDomain({ show, handleClose, webKey } = {}) {
  const [isLoading, setLoading] = useState(false)
  const [, modStore] = useContext(StoreContext)

  const firebase = useFirebaseApp()

  const userPlan = useUserData('/plan_id')
  const userProduct = useUserData('/product_id')
  const webData = useUserData(`/sites/${webKey}`)

  const { appIcon, appName, webDomain, webHost } = webData || {}

  const removeDomain = useCallback(async () => {
    // TODO: CONFIRM
    if (!window.confirm('Are you sure?')) {
      return
    }
    setLoading(true)
    try {
      await removeWebsite({
        firebase,
        webKey,
        removeDomain: true,
        removeStorage: true,
      })
      modStore({
        alertVariant: 'success',
        alertTimeout: -1,
        alertText: 'Removed custom Domain successfully',
      })
    } catch (err) {
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
      modStore({
        alertVariant: 'danger',
        alertTimeout: -1,
        alertText: 'Something went wrong',
      })
    }
    setLoading(false)
  }, [firebase, modStore, webKey])

  // Changes Modal Body based on conditions
  const DomainForm = useMemo(() => {
    const paidPlans = [PLAN_GOLD, PLAN_SILVER]
    const validPlan =
      paidPlans.includes(userPlan) || paidPlans.includes(userProduct)
    if (isLoading) {
      return RemoveLoading
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
    return PayInfo
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
