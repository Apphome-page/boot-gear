import Link from 'next/link'
import { useRouter } from 'next/router'

import { Navbar, Nav } from 'react-bootstrap'

const headerLinks = [
  {
    name: 'Icon Generator',
    path: '/icons',
  },
  {
    name: 'Screenshot Generator',
    path: '/screenshots',
  },
]

export default function Header() {
  const { asPath } = useRouter()
  return (
    <Navbar bg='light' expand='lg' sticky='top' className='shadow'>
      <Link href='/'>
        <h1 className='navbar-brand'>AppHome</h1>
      </Link>
      <Navbar.Toggle aria-controls='headerContent' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {headerLinks.map(({ name, path }, index) => (
            <Link key={index} href={path} passHref>
              <Nav.Link href={path} className={asPath === path ? 'active' : ''}>
                {name}
              </Nav.Link>
            </Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
