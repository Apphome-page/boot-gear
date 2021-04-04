import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { StoreContext as BuilderStoreContext } from '../helpers/store'
import useUserData from '../../../utils/useUserData'

import {
  ProgressRail,
  ProgressButton,
  ProgressStart,
  ProgressEnd,
} from '../style'

function ProgressPoints({ activeIndex, isLast, maxSlide, actionCallback }) {
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
        onClick={() => (isActive && !isLast ? actionCallback(i) : null)}
      >
        Step {i}
      </ProgressButton>
    )
  }
  return <>{stageButtons}</>
}

export default function ProgressStatus({ activeIndex }) {
  const router = useRouter()

  const [{ appKey, maxSlide, setActiveSlide }, modContext] = useContext(
    BuilderStoreContext
  )

  const userSiteData = useUserData(`sites/${router.query.webEdit}`)

  const isLast = activeIndex === maxSlide

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
    if (!userSiteData.firstLaunch) {
      modContext(userSiteData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modContext, userSiteData.timestamp])

  return (
    <div className='position-relative my-3 mx-5'>
      <ProgressRail
        now={activeIndex}
        min={0}
        max={maxSlide}
        srOnly
        variant='success'
        className='rounded-0'
      />
      <ProgressStart
        key={0}
        size={32}
        className='position-absolute rounded-circle border border-light bg-light text-success'
      />
      <ProgressPoints
        activeIndex={activeIndex}
        isLast={isLast}
        maxSlide={maxSlide}
        actionCallback={setActiveSlide}
      />
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
