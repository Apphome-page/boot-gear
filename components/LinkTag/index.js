/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react'
import Link from 'next/link'
import { useAmp } from 'next/amp'

const BASE_URI = process.env.NEXT_PUBLIC_SITE_URL
const ABST_PAT = /^https?:\/\/|^\/\//i

export default function LinkTag({
  href,
  onClick,
  children,
  passHref,
  ...tagProps
}) {
  const isAmp = useAmp()

  const ampHref = useMemo(() => {
    if (!isAmp || typeof href !== 'string') {
      // TODO: Linearize if href is url-object
      return null
    }
    if (ABST_PAT.test(href)) {
      return href
    }
    return `${BASE_URI.replace(/\/$/, '')}/${href.replace(/^\//, '')}`
  }, [isAmp, href])

  if (ampHref) {
    return (
      <a {...tagProps} href={ampHref}>
        {children}
      </a>
    )
  }
  if (onClick) {
    return (
      <div role='button' tabIndex='-1' onClick={onClick} onKeyDown={onClick}>
        {children}
      </div>
    )
  }
  return (
    <Link {...tagProps} href={href} passHref={passHref}>
      {children.length > 1 ? <span>{children}</span> : children}
    </Link>
  )
}
