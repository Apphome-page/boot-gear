import { useState, useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { StoreContext } from '../../../utils/storeProvider'
import { StoreContext as BuilderStoreContext } from '../helpers/store'

import {
  ProgressRail,
  ProgressButton,
  ProgressStart,
  ProgressEnd,
} from '../style'

export default function ProgressStatus({ activeIndex }) {
  const router = useRouter()

  const [userData, setUserData] = useState({})

  const [{ firebase, userAuth }] = useContext(StoreContext)
  const [templateProps, modContext] = useContext(BuilderStoreContext)

  const userId = userAuth && userAuth.uid
  const { appKey, processing, maxSlide, setActiveSlide } = templateProps

  const isLast = activeIndex === maxSlide

  const progressPoints = useMemo(() => {
    const stageButtons = []
    for (let i = 1; i < maxSlide; i += 1) {
      const isActive = i < activeIndex + 1
      stageButtons.push(
        <ProgressButton
          key={i}
          size={32}
          className={classNames(
            'position-absolute',
            'rounded-circle',
            'border',
            'border-light',
            'bg-light',
            isActive ? 'text-success' : 'text-light',
            {
              'cursor-pointer': isActive && !isLast,
            }
          )}
          currentIndex={i}
          maxIndex={maxSlide}
          onClick={() => (isActive && !isLast ? setActiveSlide(i) : null)}
        >
          Step {i}
        </ProgressButton>
      )
    }
    return stageButtons
  }, [activeIndex, isLast, maxSlide, setActiveSlide])

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
    if (!appKey) {
      // TODO: Validate with formik and push to appropriate place
      setActiveSlide(0)
    } else if (router.query.webStep) {
      // TODO: Validate Stage
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
      <ProgressRail
        now={activeIndex}
        min={0}
        max={maxSlide}
        srOnly
        animated={processing}
        variant={processing ? 'warning' : 'success'}
        className='rounded-0'
      />
      <ProgressStart
        key={0}
        size={32}
        className='position-absolute rounded-circle border border-light bg-light text-success'
      />
      {progressPoints}
      <ProgressEnd
        key={maxSlide}
        size={isLast ? 42 : 32}
        className={classNames(
          'position-absolute',
          'rounded-circle',
          'border',
          'border-light',
          'bg-light',
          isLast ? 'text-success' : 'text-light'
        )}
      />
    </div>
  )
}
