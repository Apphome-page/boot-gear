import { Media, Image } from 'react-bootstrap'
import Link from 'next/link'

const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

export default function WebsiteDetails({
  webKey,
  webLink = `/${webKey}/`,
  webData: { appName, appIcon, appDescription, timestamp } = {},
} = {}) {
  // TODO: Update with custom Domain if present
  return (
    <Media>
      <Image
        width={64}
        height={64}
        className='mt-2 mr-2 rounded'
        src={`${FIRESTORE_BASE}${encodeURIComponent(appIcon)}?alt=media`}
        alt=''
      />
      <Media.Body className='w-75'>
        <Link href={webLink} prefetch={false}>
          <div className='cursor-pointer'>
            <p className='m-0 lead'>{appName}</p>
            <p className='mini text-truncate'>{appDescription}</p>
            <p className='mini text-muted'>
              <span className='font-weight-bold'>Last Update: </span>
              {new Date(timestamp).toDateString()}
            </p>
          </div>
        </Link>
      </Media.Body>
    </Media>
  )
}
