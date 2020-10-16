import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useContext } from 'react'
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
  {
    name: 'Website Generator',
    path: '/website',
  },
]

export default function Header() {
  const { asPath } = useRouter()
  const [{ firebase, userAuth, signPop }, modStore] = useContext(StoreContext)

  const userId = userAuth && userAuth.uid

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((userAuthState) =>
      modStore({
        userAuth: userAuthState,
        userData: { uid: userAuthState && userAuthState.uid },
      })
    )
  }, [firebase, modStore])

  useEffect(() => {
    const userDataRef = firebase.database().ref(`users/${userId}`)

    userDataRef.on('value', (snapshot) => {
      modStore({ userData: snapshot.val() })
    })

    return () => {
      userDataRef.off()
    }
  }, [firebase, userId, modStore])

  return (
    <>
      <Modal show={signPop} onHide={() => modStore({ signPop: false })}>
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
            <Nav.Link href='/blog'>Blog</Nav.Link>
            {userAuth ? (
              <NavDropdown alignRight title={`Hi! ${userAuth.displayName}`}>
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
