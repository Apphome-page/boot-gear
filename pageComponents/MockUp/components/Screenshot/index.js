import { useContext } from 'react'
import { FormFile } from 'react-bootstrap'
import IconInfo from '@svg-icons/bootstrap/info-circle.svg'

import { getFrameProps } from '../../helpers/defaults'

import { MockupContext } from '../../helpers/MockProvider'

export default function Design() {
  const { data, current, modCurrent: modCurrentMockUp } = useContext(
    MockupContext
  )
  const { frameType, frameId, frameDevice } = data[current]
  const { screenshotHeight, screenshotWidth } = getFrameProps(
    frameType,
    frameId,
    { frameDevice }
  )

  return (
    <>
      <FormFile
        id='scrFile'
        className='mt-3 mb-1 cursor-pointer'
        label='Upload Screenshot'
        accept='image/*'
        custom
        onChange={(e) => {
          modCurrentMockUp({
            screenshot: window.URL.createObjectURL(e.target.files[0]),
          })
          e.target.value = ''
        }}
      />
      <div className='m-1 d-flex align-items-center mini'>
        <IconInfo height='24' width='24' className='mr-1' />
        Screenshot should be of height {screenshotHeight}px, & width{' '}
        {screenshotWidth}px.
      </div>
    </>
  )
}
