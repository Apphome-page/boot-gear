import { useContext, useState } from 'react'
import { Button, Spinner, ProgressBar } from 'react-bootstrap'
import IconDownload from '@svg-icons/bootstrap/file-earmark-arrow-down.svg'
import dynamic from 'next/dynamic'

import { MockupContext } from '../../helpers/MockProvider'

const Subscription = dynamic(
  () => import('../../../../components/Subscription'),
  {
    ssr: false,
  }
)

export default function Actions() {
  const { eventSave } = useContext(MockupContext)
  const [progress, setProgress] = useState(0)
  const [subShow, setSubShow] = useState(false)

  const isLoading = progress === 0 || progress === 100
  return (
    <>
      <Subscription
        show={subShow}
        onComplete={() => {
          setSubShow(false)
          eventSave(setProgress)
        }}
      />
      <Button
        variant='alt'
        className='w-100 d-flex justify-content-center align-items-center'
        onClick={() => {
          setSubShow(true)
        }}
      >
        {isLoading ? (
          <>
            <span className='mr-1'>Save & Download</span>
            <IconDownload height='24' width='24' />
          </>
        ) : (
          <>
            <span className='mr-1'>Processing </span>
            <Spinner animation='border' variant='warning' size='sm' />
          </>
        )}
      </Button>
      <ProgressBar
        className='bg-alt rounded-0'
        animated
        variant='warning'
        now={progress}
        style={{ height: '2px' }}
      />
    </>
  )
}
