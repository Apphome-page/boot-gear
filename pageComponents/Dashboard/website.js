import { useCallback, useContext } from 'react'
import { Table, ButtonGroup, Button } from 'react-bootstrap'
import Link from 'next/link'

import { StoreContext } from '../../utils/storeProvider'
import useUserData from '../../utils/useUserData'

import removeWebsite from '../Website/helpers/remove'

export default function Website() {
  const [{ firebase, userAuth }] = useContext(StoreContext)
  const userData = useUserData()
  const userId = userAuth && userAuth.uid
  const userSites = Object.keys((userData && userData.sites) || {})
  const actionDelete = useCallback(
    (appKey) => {
      if (window.confirm('Do you really wish to remove your website?')) {
        removeWebsite(firebase, userId, appKey)
      }
    },
    [firebase, userId]
  )
  return (
    <>
      <div className='lead text-dark mb-2 pb-2 border-bottom'>
        Your Websites
      </div>
      <Table borderless className='m-0'>
        <tbody>
          {userSites.length ? (
            userSites.map((uSite, uIndex) => (
              <tr key={uIndex}>
                <td className='w-100'>{uSite}</td>
                <td>
                  <ButtonGroup>
                    <Link href={`/app-website-builder?edit=${uSite}`}>
                      <Button variant='outline-secondary'>Edit</Button>
                    </Link>
                    <Button
                      variant='outline-danger'
                      onClick={() => {
                        actionDelete(uSite)
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='w-100 text-center'>
                <Link href='/app-website-builder'>
                  <Button variant='light' className='btn-alt'>
                    Create a new website for your App!
                  </Button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}
