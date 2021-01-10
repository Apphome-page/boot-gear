import { useCallback, useContext } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import Link from 'next/link'

import { StoreContext } from '../../../utils/storeProvider'

import removeWebsite from '../helpers/removeWebsite'

export default function WebsiteActions({
  webKey,
  webAction = () => {},
  webActionText = 'Add Custom Domain',
} = {}) {
  const [{ firebase }] = useContext(StoreContext)
  const actionDelete = useCallback(
    async (appKey) => {
      if (window.confirm('Do you really wish to remove your website?')) {
        await removeWebsite({
          firebase,
          webKey: appKey,
          removeDomain: true,
          removeStorage: true,
        })
      }
    },
    [firebase]
  )
  return (
    <>
      <Button variant='outline-info' className='m-1 w-100' onClick={webAction}>
        {webActionText}
      </Button>
      <ButtonGroup className='m-1 w-100'>
        <Link href={`/app-website-builder?edit=${webKey}`}>
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
