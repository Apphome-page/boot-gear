import Link from 'next/link'
import { Container } from 'react-bootstrap'

import AuthWrapper from '../../components/AuthWrapper'

import useUserData from '../../utils/useUserData'

export default function Dashboard() {
  const userData = useUserData()
  const userSites = (userData && userData.sites) || {}
  return (
    <Container className='my-5 min-vh-100'>
      <AuthWrapper>
        <h3>Websites</h3>
        <ol>
          {Object.keys(userSites).map((uSite, uIndex) => (
            <li key={uIndex}>
              {uSite} - <Link href={`/website?edit=${uSite}`}>Edit</Link> |
              Delete
            </li>
          ))}
        </ol>
      </AuthWrapper>
    </Container>
  )
}
