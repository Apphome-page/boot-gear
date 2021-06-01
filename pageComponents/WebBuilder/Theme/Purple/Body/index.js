import classNames from 'classnames'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

import styles from './styles.module.scss'

export default function Body() {
  return (
    <div className='purple-body position-relative'>
      <Navbar
        className='shadow'
        variant='light'
        bg='white'
        expand='lg'
        sticky='top'
      >
        <Container>
          <Navbar.Brand>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto' />
            <Nav>
              <Nav.Link href='#home'>Features</Nav.Link>
              <Nav.Link href='#home'>Testimonials</Nav.Link>
              <Button variant='light' size='sm' className='rounded-pill'>
                Download
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={classNames(styles.stickyPlace, styles.intro)}>
        <Container className='flex-grow-1'>Hello</Container>
      </div>
      <div className={classNames('bg-white', styles.features)}>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
        <p>Features</p>
      </div>
      <div
        className={classNames('bg-dark', styles.stickyPlace, styles.features)}
      >
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
        <p>Screenshots</p>
      </div>
    </div>
  )
}
