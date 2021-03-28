import { useCallback, useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
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
  const [{ firebase }, modStore] = useContext(StoreContext)
  const actionDelete = useCallback(
    async (appKey) => {
      // TODO: CONFIRM
      if (window.confirm('Do you really wish to remove your website?')) {
        modStore({
          loadingPop: true,
        })
        try {
          await removeWebsite({
            firebase,
            webKey: appKey,
            removeDomain: true,
            removeStorage: true,
          })
          modStore({
            loadingPop: false,
          })
        } catch (err) {
          captureExceptionSentry(err, (scope) => {
            scope.setTags(ExceptionTags)
            return scope
          })
          modStore({
            loadingPop: false,
            alertVariant: 'danger',
            alertTimeout: -1,
            alertText: 'Something went wrong',
          })
        }
      }
    },
    [firebase, modStore]
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
