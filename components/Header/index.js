import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap'

import { StoreContext } from '../../utils/storeProvider'

import { AuthWrap } from './style'

const productLinks = [
  {
    name: 'App Icon Generator',
    path: '/icons',
  },
  {
    name: 'Screenshots Generator',
    path: '/screenshots',
  },
]

export default function Header() {
  const [signedIn, setSignedIn] = useState(false)
  const [signPop, setSignPop] = useState(false)
  const { asPath } = useRouter()
  const [{ firebase }] = useContext(StoreContext)
  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setSignedIn(user)),
    [firebase]
  )
  return (
    <>
      <Modal show={signPop} onHide={() => setSignPop(false)}>
        <Modal.Header closeButton />
        <ModalBody className='p-0'>
          <AuthWrap
            uiConfig={{
              // Popup signin flow rather than redirect flow.
              signInFlow: 'popup',
              // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
              // signInSuccessUrl: '/signedIn',
              // We will display Google and Facebook as auth providers.
              signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
              callbacks: {
                signInSuccess: () => {
                  setSignedIn(true)
                  setSignPop(false)
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
          <div className='navbar-brand'>AppHome</div>
        </Link>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavDropdown alignRight title='Products'>
              {productLinks.map(({ name, path }, index) => (
                <NavDropdown.Item key={index} as='div'>
                  <Link href={path} passHref>
                    <Nav.Link
                      href={path}
                      className={asPath === path ? 'active' : ''}
                    >
                      {name}
                    </Nav.Link>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href='/features'>Features</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>
            <Nav.Link href='/blog'>Blog</Nav.Link>
            {signedIn ? (
              <NavDropdown
                alignRight
                title={`Hi! ${firebase.auth().currentUser.displayName}`}
              >
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button
                    variant='info'
                    onClick={() => firebase.auth().signOut()}
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
        {!signedIn ? (
          <Button
            className='btn-alt ml-auto ml-lg-3 mr-3'
            variant='light'
            onClick={() => setSignPop(true)}
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
