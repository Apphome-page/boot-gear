import { NavItem, NavLink } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { useUserAuth } from '../Context/Login'
import Link from '../Tag/Link'

import headerLinks from '../../pageData/_app/headerLinks.json'

export default function NavHeaderLinks() {
  const { pathname } = useRouter()
  const userAuth = useUserAuth()
  if (userAuth) {
    return <></>
  }
  return (
    <>
      {headerLinks.map(({ name: linkName, path }, index) => (
        <NavItem key={index}>
          <Link href={path} passHref>
            <NavLink
              href={path}
              className={classNames({
                active: pathname === path,
              })}
            >
              {linkName}
            </NavLink>
          </Link>
        </NavItem>
      ))}
    </>
  )
}
