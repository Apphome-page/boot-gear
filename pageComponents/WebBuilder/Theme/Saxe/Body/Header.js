/* eslint-disable jsx-a11y/label-has-associated-control */
import { Container, Navbar } from 'react-bootstrap'
import classNames from 'classnames'

import IconList from '@svg-icons/bootstrap/list.svg'
import IconClose from '@svg-icons/bootstrap/x.svg'

import ImageEditor from '../../../components/Editor/Image'

import { NavName, NavFeatures, NavTestimonials, NavVideo } from './Nav'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default function Header({ links = true }) {
  return (
    <Container className='position-relative d-flex py-5 text-light'>
      <Navbar.Brand className='d-flex align-self-start'>
        <ImageEditor
          keyName='appIcon'
          width='30'
          height='30'
          placeholderImage={`${SITE_URL}/web/saxe/logo.png`}
        />
        <NavName />
      </Navbar.Brand>
      <div className='mr-auto' />
      <div className={classNames('position-relative', { 'd-none': !links })}>
        <input
          id='menu-toggle'
          className='d-none'
          type='checkbox'
          aria-label='Menu Toggle'
        />
        <label
          id='menu-toggle-icon'
          className='d-block d-md-none text-right'
          htmlFor='menu-toggle'
        >
          <span id='menu-toggle-open' className='p-1 border rounded'>
            <IconList height='24' width='24' />
          </span>
          <span id='menu-toggle-close' className='p-1 border rounded'>
            <IconClose height='24' width='24' />
          </span>
        </label>
        <div id='menu-list'>
          <NavFeatures />
          <NavVideo />
          <NavTestimonials />
        </div>
      </div>
    </Container>
  )
}
