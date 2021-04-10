import { useContext } from 'react'
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useAuth } from 'reactfire'

import classNames from 'classnames'

import IconGear from '@svg-icons/bootstrap/gear-fill.svg'
import IconDash from '@svg-icons/bootstrap/person-circle.svg'
import IconOut from '@svg-icons/bootstrap/box-arrow-right.svg'
import IconPlan from '@svg-icons/bootstrap/newspaper.svg'
import IconWebsite from '@svg-icons/bootstrap/card-heading.svg'

import Link from '../LinkTag'

import { StoreContext } from '../../utils/storeProvider'

import productLinks from '../../pageData/links/headerProducts.json'
import headerLinks from '../../pageData/links/headerLinks.json'

export default function Header() {
  const router = useRouter()
  const userAuth = useAuth()
  const [, modStore] = useContext(StoreContext)

  const { currentUser } = userAuth

  return (
    <Navbar
      bg='light'
      expand='lg'
      sticky='top'
      className='shadow px-lg-5 py-lg-1'
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
                    className={classNames({
                      active: router.pathname === path,
                    })}
                  >
                    {name}
                  </Nav.Link>
                </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          {currentUser
            ? ''
            : headerLinks.map(({ name, path }, index) => (
                <NavItem key={index}>
                  <Link href={path} passHref>
                    <NavLink
                      href={path}
                      className={classNames({
                        active: router.pathname === path,
                      })}
                    >
                      {name}
                    </NavLink>
                  </Link>
                </NavItem>
              ))}
          {currentUser ? (
            <NavDropdown
              alignRight
              title={<IconGear sizeheight='20' width='20' />}
            >
              <NavDropdown.Item
                as='div'
                className='px-3 text-muted cursor-pointer'
              >
                <Link href='/dashboard'>
                  <div>
                    <IconDash height='18' width='18' className='mr-1' />
                    {currentUser.displayName}
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
                    <IconPlan height='18' width='18' className='mr-1' />
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
                  userAuth.signOut()
                  router.push('/')
                }}
              >
                <IconOut height='18' width='18' className='mr-1' />
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Button
              className='mx-3'
              variant='alt'
              onClick={() => modStore({ signPop: true })}
            >
              Sign In
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Toggle
        aria-controls='headerContent'
        className='my-1 my-lg-0 mr-0 ml-auto'
      />
    </Navbar>
  )
}
