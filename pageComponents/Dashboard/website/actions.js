import { useCallback, useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { useFirebaseApp } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'
import noop from 'lodash/noop'

import Link from '../../../components/LinkTag'
import { useAlerts } from '../../../components/AlertPop'

import { StoreContext } from '../../../utils/storeProvider'

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
  const [{ queueLoading, unqueueLoading }] = useContext(StoreContext)
  const firebase = useFirebaseApp()
  const { addAlert } = useAlerts()

  const actionDelete = useCallback(
    async (appKey) => {
      // TODO: CONFIRM
      if (window.confirm('Do you really wish to remove your website?')) {
        queueLoading()
        try {
          await removeWebsite({
            firebase,
            webKey: appKey,
            removeDomain: true,
            removeStorage: true,
          })
        } catch (err) {
          captureExceptionSentry(err, (scope) => {
            scope.setTags(ExceptionTags)
            return scope
          })
          addAlert('Something went wrong', {
            variant: 'error',
            autoDismiss: false,
          })
        }
        unqueueLoading()
      }
    },
    [addAlert, firebase, queueLoading, unqueueLoading]
  )
  return (
    <>
      <Button variant='outline-info' className='m-1 w-100' onClick={webAction}>
        {webActionText}
      </Button>
      <ButtonGroup className='m-1 w-100'>
        <Link href={`/app-website-builder?webEdit=${webKey}`}>
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
