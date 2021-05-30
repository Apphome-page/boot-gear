import { useCallback } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { captureException as captureExceptionSentry } from '@sentry/react'
import noop from 'lodash/noop'

import Link from '../../../components/Tag/Link'
import { useLoading } from '../../../components/Context/Loading'
import { useAlerts } from '../../../components/Context/Alert'
import { useFirebase } from '../../../components/Context/Login'

// TODO: Defer
import removeWebsite from '../helpers/removeWebsite'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function WebsiteActions({
  webKey,
  webAction = noop,
  webActionText = 'Add Custom Domain',
} = {}) {
  const { firebaseApp } = useFirebase()
  const { addAlert } = useAlerts()
  const { queueLoading, unqueueLoading } = useLoading()

  const actionDelete = useCallback(
    async (appKey) => {
      // TODO: CONFIRM
      if (window.confirm('Do you really wish to remove your website?')) {
        queueLoading()
        try {
          await removeWebsite({
            firebase: firebaseApp,
            webKey: appKey,
            removeDomain: true,
            removeStorage: true,
            removeMeta: true,
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
        unqueueLoading()
      }
    },
    [addAlert, firebaseApp, queueLoading, unqueueLoading]
  )
  return (
    <>
      <Button variant='outline-info' className='m-1 w-100' onClick={webAction}>
        {webActionText}
      </Button>
      <ButtonGroup className='m-1 w-100'>
        <Link href={`/dashboard/website-builder?appKey=${webKey}`}>
          <Button variant='outline-secondary'>Edit</Button>
        </Link>
        <Button
          variant='outline-danger'
          onClick={() => {
            actionDelete(webKey)
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </>
  )
}
