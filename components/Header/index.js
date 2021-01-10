import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
} from 'react-bootstrap'
import { GearFill as IconGear } from '@emotion-icons/bootstrap/GearFill'
import { ClipboardData as IconDash } from '@emotion-icons/bootstrap/ClipboardData'
import { BoxArrowRight as IconOut } from '@emotion-icons/bootstrap/BoxArrowRight'

import { StoreContext } from '../../utils/storeProvider'

import { AuthWrap } from './style'

import productLinks from '../../pageData/links/headerProducts.json'
import headerLinks from '../../pageData/links/headerLinks.json'

export default function Header() {
  const router = useRouter()
  const [{ firebase, userAuth, signPop, signForced }, modStore] = useContext(
    StoreContext
  )
  const userId = userAuth && userAuth.uid

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((userAuthState) => {
      modStore({
        userAuth: userAuthState,
      })
    })
  }, [firebase, modStore])

  return (
    <>
      <Modal
        show={signPop || (signForced && !userId)}
        onHide={() => {
          if (signForced && !userId) {
            router.replace('/')
          }
          modStore({ signPop: false })
        }}
        backdrop={signForced ? 'static' : true}
      >
        <Modal.Header closeButton />
        <ModalBody className='p-0'>
          <AuthWrap
            uiConfig={{
              signInFlow: 'popup',
              signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
              callbacks: {
                signInSuccessWithAuthResult: () => {
                  modStore({ signPop: false })
                },
              },
            }}
            firebaseAuth={firebase.auth()}
          />
        </ModalBody>
      </Modal>
      <Navbar
        bg='light'
        expand='lg'
        sticky='top'
        className='shadow px-lg-5 py-lg-2'
      >
        <Link href='/' prefetch={false}>
          <div className='navbar-brand cursor-pointer'>AppLanding</div>
        </Link>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavDropdown alignRight title='Products'>
              {productLinks.map(({ name, path }, index) => (
                <NavDropdown.Item key={index} as='div'>
                  <Link href={path} passHref prefetch={false}>
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
                <Link href={path} passHref prefetch={false}>
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
                <NavDropdown.Item as='div' className='px-3 mini text-muted'>
                  {userAuth.displayName}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as='div'
                  className='px-3 text-muted cursor-pointer'
                >
                  <Link href='/dashboard' prefetch={false}>
                    <div>
                      <IconDash size='18' className='mr-2' />
                      Dashboard
                    </div>
                  </Link>
                </NavDropdown.Item>
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
    </>
  )
}
