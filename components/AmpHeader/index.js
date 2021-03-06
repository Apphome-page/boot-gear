import { Button } from 'react-bootstrap'

import Link from '../LinkTag'

export default function AmpHeader() {
  return (
    <div className='header-wrap px-5 py-1 d-flex align-items-center shadow bg-light sticky-top'>
      <Link href='/' className='header-title text-dark'>
        Applanding
      </Link>
      <Link
        href='/app-icon-generator'
        className='header-link d-lg-block d-none mx-1 text-dark'
      >
        App Icon Generator
      </Link>
      <Link
        href='/app-screenshot-generator'
        className='header-link d-lg-block d-none mx-1 text-dark'
      >
        App Screenshot Generator
      </Link>
      <Link
        href='/app-website-builder'
        className='header-link d-lg-block d-none mx-1 text-dark'
      >
        App Website Builder
      </Link>
      <Link
        href='/dashboard/websites'
        rel='nofollow'
        className='header-button mx-1'
      >
        <Button variant='alt'>Sign Up</Button>
      </Link>
      <style jsx>
        {`
          .header-wrap {
            padding: 4px 48px;
          }
          .header-wrap :global(.header-title) {
            font-size: 20px;
            flex-grow: 1;
          }
          .header-wrap :global(.header-link:before) {
            content: '';
            margin: 0px 4px;
          }
          .header-wrap :global(.header-button) {
            margin-left: 16px;
          }
          @media (max-width: 768px) {
            .header-wrap {
              padding: 4px 16px;
            }
          }
        `}
      </style>
    </div>
  )
}
