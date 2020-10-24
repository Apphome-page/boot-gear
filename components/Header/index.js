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

import { StoreContext } from '../../utils/storeProvider'

import { AuthWrap } from './style'

const productLinks = [
  {
    name: 'App Icon Generator',
    path: '/app-icon-generator',
  },
  {
    name: 'App Screenshot Generator',
    path: '/app-screenshot-generator',
  },
  {
    name: 'App Website Builder',
    path: '/app-website-builder',
  },
]

const headerLinks = [
  {
    name: 'Features',
    path: '/features',
  },
  {
    name: 'Pricing',
    path: '/pricing',
  },
  { name: 'Blog', path: '/blog' },
]

const userLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
]

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
        <Link href='/'>
          <div className='navbar-brand cursor-pointer'>AppHome</div>
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
              <NavDropdown alignRight title={`Hi! ${userAuth.displayName}`}>
                {userLinks.map(({ name, path }, index) => (
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
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button
                    variant='outline-danger'
                    onClick={() => {
                      router.push('/')
                      firebase.auth().signOut()
                    }}
                  >
                    Sign Out
                  </Button>
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
