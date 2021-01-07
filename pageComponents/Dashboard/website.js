import { useCallback, useContext } from 'react'
import {
  ButtonGroup,
  Button,
  Container,
  Row,
  Col,
  Media,
  Image,
} from 'react-bootstrap'
import Link from 'next/link'

import { StoreContext } from '../../utils/storeProvider'
import useUserData from '../../utils/useUserData'

import removeWebsite from '../Website/helpers/remove'

const PLAN_SILVER = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const PLAN_GOLD = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD
const FIRESTORE_BASE = process.env.NEXT_PUBLIC_FIRESTORE_URL

function WebsiteDetails({
  webKey,
  webData: { appName, appIcon, appDescription, timeStamp } = {},
} = {}) {
  // TODO: Update with custom Domain if present
  const webLink = `/${webKey}/`
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
              {new Date(timeStamp).toDateString()}
            </p>
          </div>
        </Link>
      </Media.Body>
    </Media>
  )
}

export default function Website() {
  const [{ firebase, userAuth }] = useContext(StoreContext)
  const userData = useUserData()
  const userId = userAuth && userAuth.uid
  const userSites = Object.keys((userData && userData.sites) || {})
  const paidPlans = [PLAN_GOLD, PLAN_SILVER]
  const validPlan =
    paidPlans.includes(userData.plan_id) ||
    paidPlans.includes(userData.product_id)

  const actionDelete = useCallback(
    (appKey) => {
      if (window.confirm('Do you really wish to remove your website?')) {
        removeWebsite(firebase, userId, appKey)
      }
    },
    [firebase, userId]
  )
  return (
    <>
      <div className='lead text-dark my-2 pb-1 border-bottom'>
        Your Websites
      </div>
      <Container className='mb-5'>
        {userSites.map((uSite, uIndex) => (
          <Row key={uIndex} className='py-2 border shadow-sm'>
            <Col lg={8}>
              <WebsiteDetails webKey={uSite} webData={userData.sites[uSite]} />
            </Col>
            <Col lg={4}>
              {validPlan ? (
                <Button variant='outline-info' className='m-1 w-100'>
                  Add Custom Domain
                </Button>
              ) : (
                ''
              )}
              <ButtonGroup className='m-1 w-100'>
                <Link href={`/app-website-builder?edit=${uSite}`}>
                  <Button variant='outline-secondary'>Edit</Button>
                </Link>
                <Button
                  variant='outline-danger'
                  onClick={() => {
                    actionDelete(uSite)
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        ))}
        <Row className='my-2'>
          <Col className='text-center'>
            <Link href='/app-website-builder'>
              <Button variant='light' className='btn-alt'>
                Create a new website for your App!
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
