import { Button, NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'

import IconGear from '@svg-icons/bootstrap/gear-fill.svg'
import IconDash from '@svg-icons/bootstrap/person-circle.svg'
import IconOut from '@svg-icons/bootstrap/box-arrow-right.svg'
import IconPlan from '@svg-icons/bootstrap/newspaper.svg'
import IconWebsite from '@svg-icons/bootstrap/card-heading.svg'

import Link from '../Tag/Link'

import { useLogin, useFirebase, useUserAuth } from '../Context/Login'

export default function NavUserLinks() {
  const router = useRouter()

  const { signPop } = useLogin()
  const { firebaseApp } = useFirebase()
  const userAuth = useUserAuth()

  if (!userAuth) {
    return (
      <Button className='mx-3' variant='alt' onClick={signPop}>
        Sign In
      </Button>
    )
  }
  return (
    <NavDropdown alignRight title={<IconGear sizeheight='20' width='20' />}>
      <NavDropdown.Item as='div' className='px-3 text-muted cursor-pointer'>
        <Link href='/dashboard'>
          <div>
            <IconDash height='18' width='18' className='mr-1' />
            {userAuth.displayName}
          </div>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as='div' className='px-3 text-muted cursor-pointer'>
        <Link href='/dashboard/subscriptions'>
          <div>
            <IconPlan height='18' width='18' className='mr-1' />
            My Subscriptions
          </div>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item as='div' className='px-3 text-muted cursor-pointer'>
        <Link href='/dashboard/websites'>
          <div>
            <IconWebsite height='18' width='18' className='mr-1' />
            My Websites
          </div>
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        as='div'
        className='px-3 text-danger cursor-pointer'
        onClick={() => {
          if (firebaseApp && userAuth) {
            firebaseApp.auth().signOut()
            router.push('/')
          }
        }}
      >
        <IconOut height='18' width='18' className='mr-1' />
        Sign Out
      </NavDropdown.Item>
    </NavDropdown>
  )
}
