import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProgressBar } from 'react-bootstrap'

import useUserData from '../../../utils/useUserData'
import { StoreContext } from '../helpers/store'

export default function ProgressStatus({ activeIndex }) {
  const {
    query: { edit: webEdit },
  } = useRouter()
  const [{ processing, maxSlide }, modContext] = useContext(StoreContext)
  const {
    appAbout,
    appAddress,
    appAndroid,
    appDescription,
    appDownloads,
    appIos,
    appName,
    appRating,
    appTitle,
    appVideo,
  } = useUserData(`sites/${webEdit}`)
  useEffect(() => {
    modContext({
      appAbout,
      appAddress,
      appAndroid,
      appDescription,
      appDownloads,
      appIos,
      appName,
      appRating,
      appTitle,
      appVideo,
    })
  }, [
    appAbout,
    appAddress,
    appAndroid,
    appDescription,
    appDownloads,
    appIos,
    appName,
    appRating,
    appTitle,
    appVideo,
    modContext,
  ])
  return (
    <ProgressBar
      now={activeIndex + 1}
      min={0}
      max={maxSlide + 1}
      srOnly
      animated={processing}
      variant={processing ? 'warning' : 'success'}
      className='rounded-0'
      style={{ height: '4px' }}
    />
  )
}
