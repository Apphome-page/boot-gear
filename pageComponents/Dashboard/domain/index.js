import { useState, useCallback } from 'react'
import { Button, Image, Modal, ModalBody } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'

import { useAlerts } from '../../../components/AlertPop'
import { useUserData, useFirebaseApp } from '../../../components/LoginPop'

import removeWebsite from '../helpers/removeWebsite'

import DomainSetup from './setup'
import DomainVerify from './verify'
// import DomainNameserver from './nameserver'
import DomainValidate from './validate'
import RemoveLoading from './removeLoading'
import PayInfo from './pay'

const PLAN_SILVER = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const PLAN_GOLD = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD
const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

const PAID_PLANS = [PLAN_GOLD, PLAN_SILVER]

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function DashboardDomain({ show, handleClose, webKey } = {}) {
  const [isLoading, setLoading] = useState(false)

  const { addAlert } = useAlerts()

  const firebaseApp = useFirebaseApp()

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
        firebase: firebaseApp,
        webKey,
        removeDomain: true,
        removeStorage: false,
      })
      addAlert('Removed custom Domain successfully', {
        variant: 'success',
      })
    } catch (err) {
      captureExceptionSentry(err, (scope) => {
        scope.setTags(ExceptionTags)
        return scope
      })
      addAlert('Something went wrong', {
        variant: 'danger',
        autoDismiss: false,
      })
    }
    setLoading(false)
  }, [addAlert, firebaseApp, webKey])

  const validPlan =
    PAID_PLANS.includes(userPlan) || PAID_PLANS.includes(userProduct)
  // Changes Modal Body based on conditions
  let DomainForm = PayInfo
  let canRemoveDomain = false
  if (isLoading) {
    DomainForm = RemoveLoading
  } else if (validPlan) {
    if (webDomain) {
      canRemoveDomain = true
      DomainForm = webHost ? DomainValidate : DomainVerify
    } else {
      DomainForm = DomainSetup
    }
  }

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
          className='mr-1 rounded'
        />
        <div className='lead text-white'>{appName}</div>
      </Modal.Footer>
      <ModalBody>
        <DomainForm webKey={webKey} webData={webData} />
      </ModalBody>
      <Modal.Header className='border-top py-3'>
        {canRemoveDomain ? (
          <Button
            size='sm'
            variant='light'
            className='border-0 text-primary rounded-0 bg-white'
            onClick={removeDomain}
          >
            Remove custom domain
          </Button>
        ) : (
          <div />
        )}
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
