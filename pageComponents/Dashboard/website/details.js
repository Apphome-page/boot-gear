import { Media, Image } from 'react-bootstrap'
import IconLink from '@svg-icons/bootstrap/link-45deg.svg'

const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

export default function WebsiteDetails({
  webKey,
  webLink = `/${webKey}/`,
  webData: { appName, appIcon, appDescription, timestamp } = {},
} = {}) {
  return (
    <Media>
      <Image
        width={64}
        height={64}
        className='mt-1 mr-3 rounded'
        src={`${FIRESTORE_BASE}${encodeURIComponent(appIcon)}?alt=media`}
        alt=''
      />
      <Media.Body className='w-75'>
        <p className='m-0 lead'>
          {appName}
          <a className='mx-1' href={webLink} target='_blank' rel='noreferrer'>
            <IconLink height='24' width='24' />
          </a>
        </p>
        <p className='mini text-truncate'>{appDescription}</p>
        <p className='mini text-muted'>
          <span className='font-weight-bold'>Last Update: </span>
          {new Date(timestamp).toDateString()}
        </p>
      </Media.Body>
    </Media>
  )
}
