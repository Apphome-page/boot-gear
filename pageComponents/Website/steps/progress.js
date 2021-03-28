import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ProgressBar } from 'react-bootstrap'

import { StoreContext } from '../../../utils/storeProvider'
import { StoreContext as BuilderStoreContext } from '../helpers/store'

import { ProgressButton, ProgressStart, ProgressEnd } from '../style'

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
    <div className='position-relative my-3 mx-5'>
      <ProgressBar
        now={activeIndex}
        min={0}
        max={maxSlide}
        srOnly
        animated={processing}
        variant={processing ? 'warning' : 'success'}
        className='rounded-0'
        style={{ height: '4px' }}
      />
      {(() => {
        const StageButtons = [
          <ProgressStart
            key={0}
            size={32}
            className='position-absolute rounded-circle border border-light bg-light text-success'
          />,
        ]
        for (let i = 1; i < maxSlide; i += 1) {
          const isActive = i < activeIndex + 1
          StageButtons.push(
            <ProgressButton
              key={i}
              size={32}
              className={`position-absolute rounded-circle border border-light ${
                isActive
                  ? 'cursor-pointer bg-light text-success'
                  : 'bg-light text-light'
              }`}
              currentIndex={i}
              maxIndex={maxSlide}
              onClick={
                isActive
                  ? () => {
                      setActiveSlide(i)
                    }
                  : null
              }
            >
              Step {i}
            </ProgressButton>
          )
        }
        const isLast = activeIndex === maxSlide
        StageButtons.push(
          <ProgressEnd
            size={isLast ? 42 : 32}
            className={`position-absolute rounded-circle border border-light ${
              isLast ? 'bg-light text-success' : 'bg-light text-light'
            }`}
          />
        )
        return StageButtons
      })()}
    </div>
  )
}
