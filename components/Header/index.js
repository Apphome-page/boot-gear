import { Navbar, Nav } from 'react-bootstrap'

import Link from '../Tag/Link'

import NavProductLinks from './NavProductLinks'
import NavHeaderLinks from './NavHeaderLinks'
import NavUserLinks from './NavUserLinks'

// TODO: break into smaller chunks to prevent causing heavy re-renders.
export default function Header() {
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
          <NavProductLinks />
          <NavHeaderLinks />
          <NavUserLinks />
        </Nav>
      </Navbar.Collapse>
      <Navbar.Toggle
        aria-controls='headerContent'
        className='my-1 my-lg-0 mr-0 ml-auto'
      />
    </Navbar>
  )
}
