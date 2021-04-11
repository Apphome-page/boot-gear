import { useContext, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import IconNext from '@svg-icons/bootstrap/arrow-right-circle-fill.svg'
import IconCheck from '@svg-icons/bootstrap/check-circle-fill.svg'
import IconPlay from '@svg-icons/bootstrap/play-circle-fill.svg'

import { useUserData } from '../../../components/LoginPop'

import { StoreContext as BuilderStoreContext } from '../helpers/store'

function ProgressPoints({ activeIndex, isLast, maxSlide, actionCallback }) {
  const stageButtons = []
  for (let i = 1; i < maxSlide; i += 1) {
    const isActive = i < activeIndex + 1
    stageButtons.push(
      <div className='progress-next position-absolute' key={i}>
        <IconNext
          height='32'
          width='32'
          className={classNames(
            'rounded-circle',
            'border',
            'border-light',
            'bg-light',
            isActive ? 'text-success' : 'text-light',
            {
              'cursor-pointer': isActive && !isLast,
            }
          )}
          onClick={() => (isActive && !isLast ? actionCallback(i) : null)}
        >
          Step {i}
        </IconNext>
        <style jsx>{`
          .progress-next {
            left: ${((100 * i) / maxSlide).toFixed(3)}%;
            transition: all 0.1s linear ${(2 / maxSlide).toFixed(2)}s;
          }
        `}</style>
        <style jsx>
          {`
            .progress-next {
              top: 50%;
              transform: translate(-50%, -50%);
              opacity: 1;
            }
            .progress-next:disabled {
              opacity: 1;
            }
          `}
        </style>
      </div>
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
    <div className='progress-wrap position-relative my-3 mx-5'>
      <ProgressBar
        now={activeIndex}
        min={0}
        max={maxSlide}
        srOnly
        variant='success'
        className='progress-rail rounded-0'
        style={{ height: '4px' }}
      />
      <div className='progress-start position-absolute '>
        <IconPlay
          key={0}
          height='32'
          width='32'
          className='rounded-circle border border-light bg-light text-success'
        />
      </div>
      <ProgressPoints
        activeIndex={activeIndex}
        isLast={isLast}
        maxSlide={maxSlide}
        actionCallback={setActiveSlide}
      />
      <div className='progress-end position-absolute'>
        <IconCheck
          key={maxSlide}
          height={isLast ? 42 : 32}
          width={isLast ? 42 : 32}
          className={classNames(
            'rounded-circle',
            'border',
            'border-light',
            'bg-light',
            isLast ? 'text-success' : 'text-light'
          )}
        />
      </div>
      <style jsx>{`
        .progress-wrap .progress-start {
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          transition: all 0.1s linear 0.3s;
        }

        .progress-wrap .progress-end {
          top: 50%;
          right: 0;
          transform: translate(50%, -50%);
          transition: all 0.1s linear 0.3s;
        }
      `}</style>
    </div>
  )
}
