import { useCallback, useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { useFirebaseApp } from 'reactfire'
import { captureException as captureExceptionSentry } from '@sentry/react'
import Link from 'next/link'

import { StoreContext } from '../../../utils/storeProvider'

import removeWebsite from '../helpers/removeWebsite'

const ExceptionTags = {
  section: 'Dashboard',
  subSection: 'Domain',
}

export default function WebsiteActions({
  webKey,
  webAction = () => {},
  webActionText = 'Add Custom Domain',
} = {}) {
  const [{ queueLoading, unqueueLoading }, modStore] = useContext(StoreContext)
  const firebase = useFirebaseApp()

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
          modStore({
            alertVariant: 'danger',
            alertTimeout: -1,
            alertText: 'Something went wrong',
          })
        }
        unqueueLoading()
      }
    },
    [firebase, modStore, queueLoading, unqueueLoading]
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
