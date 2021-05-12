import { useCallback } from 'react'
import { useWebBuilderContext } from '../../../../../components/Context/WebBuilder'

import ImageEditor from '../../../Editor/Image'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://boot-gear.netlify.app'

function NavIcon() {
  const [appKeyValue] = useWebBuilderContext('appKey')
  const [appIconValue, setAppIcon] = useWebBuilderContext('appIcon')
  const [appNameValue] = useWebBuilderContext('appName')
  const appIconSrc =
    typeof appIconValue === 'string'
      ? `${SITE_URL}/${appKeyValue}/bin/${appIconValue}`
      : ''
  const onChange = useCallback((uri) => setAppIcon(uri), [setAppIcon])
  return (
    <div className='navbar-brand flex-shrink-0'>
      <ImageEditor
        id='container-appScreenshot'
        defaultValue={appIconSrc}
        onChange={onChange}
        width='30'
        height='30'
        className='d-inline-block align-top'
        alt=''
        loading='lazy'
      />
      <span className='text-dark'>{appNameValue}</span>
    </div>
  )
}

function NavFeatures() {
  const [appVideoValue] = useWebBuilderContext('appVideo')
  if (!appVideoValue) {
    return <></>
  }
  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-play' target='_self'>
        Features
      </a>
    </li>
  )
}

function NavTestimonials() {
  const [appTestimValue] = useWebBuilderContext('appTestim')
  if (!appTestimValue || !appTestimValue.length) {
    return <></>
  }
  return (
    <li className='nav-item'>
      <a className='nav-link' href='#container-testimonials' target='_self'>
        Testimonials
      </a>
    </li>
  )
}

export default function Nav() {
  return (
    <nav
      id='nav'
      className='container py-3 navbar navbar-expand-lg navbar-dark'
    >
      <NavIcon />
      <div
        className='justify-content-end collapse navbar-collapse mx-3'
        id='navbarNav'
      >
        <ul className='navbar-nav'>
          <NavFeatures />
          <NavTestimonials />
        </ul>
      </div>
      <div className='ml-auto mt-1'>
        <button type='button' className='btn btn-light flex-shrink-0'>
          Download
        </button>
      </div>
    </nav>
  )
}
