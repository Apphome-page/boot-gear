import { NavDropdown, NavLink } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import Link from '../Tag/Link'

import productLinks from '../../pageData/_app/headerProductLinks.json'

export default function NavProductLinks() {
  const { pathname } = useRouter()
  return (
    <NavDropdown alignRight title='Products'>
      {productLinks.map(({ name, path }, index) => (
        <NavDropdown.Item key={index} as='div'>
          <Link href={path} passHref>
            <NavLink
              href={path}
              className={classNames({
                active: pathname === path,
              })}
            >
              {name}
            </NavLink>
          </Link>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
}
