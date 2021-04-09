/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link'
import { useAmp } from 'next/amp'

export default function LinkTag({ href, children, ...tagProps }) {
  const isAmp = useAmp()
  // TODO: linearize `href` for AMP
  return isAmp ? (
    <a {...tagProps} href={href}>
      {children}
    </a>
  ) : (
    <Link {...tagProps} href={href}>
      {children}
    </Link>
  )
}
