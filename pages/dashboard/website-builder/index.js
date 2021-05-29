import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { useFirebase } from '../../../components/Context/Login'

import keyValidate from '../../../pageComponents/WebBuilder/helpers/keyValidate'

const WebBuilderComponent = dynamic(
  () => import('../../../pageComponents/WebBuilder'),
  {
    ssr: false,
  }
)

export default function WebBuilder() {
  const router = useRouter()
  const { firebaseLaunch, firebasePromise, firebaseApp } = useFirebase()

  const [validAppKey, setValidAppKey] = useState(false)

  useEffect(() => {
    const appKey = new URLSearchParams(window.location.search).get('appKey')
    if (!appKey) {
      window.alert('No AppKey - No Page')
      router.push(`/app-website-builder`)
      return
    }
    firebasePromise.then(() => {
      if (firebaseLaunch) {
        const fireUser = firebaseApp.auth().currentUser
        if (!fireUser) {
          window.alert('Please Login to continue...')
          return
        }
        const keyCheck = keyValidate(firebaseApp, appKey)
        if (!keyCheck) {
          window.alert('Website already exists')
          return
        }
        setValidAppKey(appKey)
        // TODO: Fetch Existing Data if any
      }
    })
  }, [firebaseApp, firebasePromise, firebaseLaunch, router])

  return validAppKey ? (
    <WebBuilderComponent appKey={validAppKey} appTheme='gum' isPreview />
  ) : (
    <Spinner />
  )
}
