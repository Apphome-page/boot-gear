import Link from 'next/link'
import { useRouter } from 'next/router'

import { useContext } from 'react'
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
} from 'react-bootstrap'
import { GearFill as IconGear } from '@emotion-icons/bootstrap/GearFill'
import { PersonCircle as IconDash } from '@emotion-icons/bootstrap/PersonCircle'
import { BoxArrowRight as IconOut } from '@emotion-icons/bootstrap/BoxArrowRight'
import { Newspaper as IconPlan } from '@emotion-icons/bootstrap/Newspaper'
import { CardHeading as IconWebsite } from '@emotion-icons/bootstrap/CardHeading'

import { StoreContext } from '../../utils/storeProvider'

import productLinks from '../../pageData/links/headerProducts.json'
import headerLinks from '../../pageData/links/headerLinks.json'

export default function Header() {
  const router = useRouter()
  const [{ firebase, userAuth }, modStore] = useContext(StoreContext)

  return (
    <Navbar
      bg='light'
      expand='lg'
      sticky='top'
      className='shadow px-lg-5 py-lg-2'
    >
      <Link href='/'>
        <div className='navbar-brand cursor-pointer'>AppLanding</div>
      </Link>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <NavDropdown alignRight title='Products'>
            {productLinks.map(({ name, path }, index) => (
              <NavDropdown.Item key={index} as='div'>
                <Link href={path} passHref>
                  <Nav.Link
                    href={path}
                    className={router.pathname === path ? 'active' : ''}
                  >
                    {name}
                  </Nav.Link>
                </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          {headerLinks.map(({ name, path }, index) => (
            <NavItem key={index}>
              <Link href={path} passHref>
                <NavLink
                  href={path}
                  className={router.pathname === path ? 'active' : ''}
                >
                  {name}
                </NavLink>
              </Link>
            </NavItem>
          ))}
          {userAuth ? (
            <NavDropdown alignRight title={<IconGear size='20' />}>
              <NavDropdown.Item
                as='div'
                className='px-3 text-muted cursor-pointer'
              >
                <Link href='/dashboard'>
                  <div>
                    <IconDash size='18' className='mr-2' />
                    {userAuth.displayName}
                  </div>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as='div'
                className='px-3 text-muted cursor-pointer'
              >
                <Link href='/dashboard/subscriptions'>
                  <div>
                    <IconPlan size='18' className='mr-2' />
                    My Subscriptions
                  </div>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item
                as='div'
                className='px-3 text-muted cursor-pointer'
              >
                <Link href='/dashboard/websites'>
                  <div>
                    <IconWebsite size='18' className='mr-2' />
                    My Websites
                  </div>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as='div'
                className='px-3 text-danger cursor-pointer'
                onClick={() => {
                  router.push('/')
                  firebase.auth().signOut()
                }}
              >
                <IconOut size='18' className='mr-2' />
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            ''
          )}
        </Nav>
      </Navbar.Collapse>
      {!userAuth ? (
        <Button
          className='btn-alt ml-auto ml-lg-3 mr-3'
          variant='light'
          onClick={() => modStore({ signPop: true })}
        >
          Sign In
        </Button>
      ) : (
        ''
      )}
      <Navbar.Toggle aria-controls='headerContent' className='my-3 my-lg-0' />
    </Navbar>
  )
}
