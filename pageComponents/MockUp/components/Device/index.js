import { useCallback, useContext } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import classNames from 'classnames'

import { MockupContext } from '../../helpers/MockProvider'

import scrMeta from '../../../../config/scrMeta.json'

import imageLoader from '../../../../utils/imageLoader'

import { getFrameProps } from '../../helpers/defaults'

import { PreviewContainer, PreviewButton, PreviewImage } from '../../style'

export default function Device() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const eventFrame = useCallback(
    ({
      currentTarget: {
        dataset: { value, type },
      },
    }) => {
      const { height: maxHeight } = currentMockStore
      if (!value) {
        return
      }
      modCurrentMockUp(getFrameProps(type || 'android', value, { maxHeight }))
    },
    [currentMockStore, modCurrentMockUp]
  )

  return (
    <Tabs
      defaultActiveKey={`device-style-${
        currentMockStore.frameType === 'android' ? 'android' : 'ios'
      }`}
      className='justify-content-center mt-1 mb-3'
    >
      <Tab eventKey='device-style-ios' title='iOS'>
        <PreviewContainer>
          {scrMeta.ios.map(({ id, name, sizes }, key) => (
            <PreviewButton
              className={classNames(
                'm-1',
                currentMockStore.frameId === id ? 'border-dark' : 'border'
              )}
              variant='outline-light'
              key={key}
              data-type='ios'
              data-value={id}
              data-name={name}
              onClick={eventFrame}
            >
              <PreviewImage
                src={`/scrPreview/ios/${id}/${sizes[0]}.png`}
                height='90'
                width='60'
                alt='iOS Device Style Preview'
                loader={imageLoader}
              />
            </PreviewButton>
          ))}
        </PreviewContainer>
      </Tab>
      <Tab eventKey='device-style-android' title='Android'>
        <PreviewContainer>
          {scrMeta.android.map(({ id, name, sizes }, key) => (
            <PreviewButton
              className={classNames(
                'm-1',
                currentMockStore.frameId === id ? 'border-dark' : 'border'
              )}
              variant='outline-light'
              key={key}
              data-type='android'
              data-value={id}
              data-name={name}
              onClick={eventFrame}
            >
              <PreviewImage
                src={`/scrPreview/android/${id}/${sizes[0]}.png`}
                height='90'
                width='60'
                alt='Android Device Style Preview'
                loader={imageLoader}
              />
            </PreviewButton>
          ))}
        </PreviewContainer>
      </Tab>
    </Tabs>
  )
}
