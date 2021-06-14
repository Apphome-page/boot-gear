/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react'
import Link from 'next/link'
import { useAmp } from 'next/amp'

const BASE_URI = process.env.NEXT_PUBLIC_SITE_URL
const ABST_PAT = /^https?:\/\/|^\/\//i

export default function LinkTag({ href, children, passHref, ...tagProps }) {
  // TODO: Remove hook, causes re-render
  const isAmp = useAmp()

  const ampHref = useMemo(() => {
    if (!isAmp || typeof href !== 'string') {
      return null
    }
    if (ABST_PAT.test(href)) {
      return href
    }
    return `${BASE_URI.replace(/\/$/, '')}/${href.replace(/^\//, '')}`
  }, [isAmp, href])

  return ampHref ? (
    <a {...tagProps} href={ampHref}>
      {children}
    </a>
  ) : (
    <Link {...tagProps} href={href} passHref={passHref}>
      {children.length > 1 ? <>{children}</> : children}
    </Link>
  )
}
