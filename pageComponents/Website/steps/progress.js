import { useContext, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import IconNext from '@svg-icons/bootstrap/arrow-right-circle-fill.svg'
import IconCheck from '@svg-icons/bootstrap/check-circle-fill.svg'
import IconPlay from '@svg-icons/bootstrap/play-circle-fill.svg'

import { useLoading } from '../../../components/LoadingPop'
import { useUserData } from '../../../components/LoginPop'
import remoteToFile from '../../../utils/urlToFile'

import { StoreContext as BuilderStoreContext } from '../helpers/store'

const progressPointDesc = [
  'App Information',
  'App Store Details',
  'App Description',
  'App Links',
  'App Summary',
]

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
        />
        <div className='py-1 progress-next-desc'>
          {progressPointDesc[i - 1] || ''}
        </div>
        <style jsx>{`
          .progress-next {
            left: ${((100 * i) / maxSlide).toFixed(3)}%;
            transition: all 0.1s linear ${(2 / maxSlide).toFixed(2)}s;
          }
        `}</style>
        <style jsx>
          {`
            .progress-next {
              height: 32px;
              width: 32px;
              top: 50%;
              transform: translate(-50%, -50%);
              opacity: 1;
            }
            .progress-next:disabled {
              opacity: 1;
            }
            .progress-next > .progress-next-desc {
              width: 64px;
              font-size: 12px;
              line-height: 14px;
              text-align: center;
              transform: translateX(-16px);
            }
            @media (max-width: 778px) {
              .progress-next > .progress-next-desc {
                display: none;
              }
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

  const [builderStore, modContext] = useContext(BuilderStoreContext)
  const { appKey, maxSlide, setActiveSlide } = builderStore || {}

  const { queueLoading, clearLoading } = useLoading()
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

  // Update All Values forcefully without looking else looping occurs
  useEffect(() => {
    if (!router.query.webEdit) {
      return
    }

    if (!userSiteData || userSiteData.firstLaunch) {
      queueLoading()
    } else {
      const { appIcon, appScreenshot } = userSiteData
      Promise.all([
        appIcon && typeof appIcon === 'string' ? remoteToFile(appIcon) : null,
        appScreenshot && typeof appScreenshot === 'string'
          ? remoteToFile(appScreenshot)
          : null,
      ]).then(([remoteAppIcon, remoteAppScreenshot]) => {
        const newContext = {
          ...userSiteData,
        }
        if (router.query.webEdit) {
          newContext.webEdit = router.query.webEdit
        }
        if (remoteAppIcon) {
          newContext.appIcon = remoteAppIcon
        }
        if (remoteAppScreenshot) {
          newContext.appScreenshot = remoteAppScreenshot
        }
        modContext(newContext)
        clearLoading()
      })
    }
    // Potential to get stuck in loop, as we are updating context based on prev values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    modContext,
    router.query.webEdit,
    userSiteData.firstLaunch,
    userSiteData.appKey,
    userSiteData.timestamp,
    queueLoading,
    clearLoading,
  ])

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
