import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProgressBar } from 'react-bootstrap'

import { StoreContext } from '../../../utils/storeProvider'
import { StoreContext as BuilderStoreContext } from '../helpers/store'

export default function ProgressStatus({ activeIndex }) {
  const router = useRouter()

  const [userData, setUserData] = useState({})

  const [{ firebase, userAuth }] = useContext(StoreContext)
  const [templateProps, modContext] = useContext(BuilderStoreContext)

  const userId = userAuth && userAuth.uid
  const { appKey, processing, maxSlide, setActiveSlide } = templateProps

  useEffect(() => {
    let userDataRef = null
    if (userId && router.query.webEdit) {
      userDataRef = firebase
        .database()
        .ref(`users/${userId}/sites/${router.query.webEdit}`)
      userDataRef.once('value').then((snap) => {
        const snapVal = snap.val() || {}
        setUserData(snapVal)
      })
    }
    return () => {
      if (userDataRef) {
        userDataRef.off()
      }
    }
  }, [firebase, userId, router.query.webEdit])

  useEffect(() => {
    // TODO: Validate Stage and push to appropriate place
    if (!appKey) {
      setActiveSlide(0)
    } else if (router.query.webStep) {
      setActiveSlide(parseInt(router.query.webStep, 10))
    }
  }, [appKey, setActiveSlide, router.query.webStep])

  // Update All Values individually else looping occurs
  useEffect(() => {
    modContext(userData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modContext, userData.timestamp])

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
