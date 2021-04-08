import { useCallback, useContext } from 'react'
import { Tabs, Tab, Container, Button } from 'react-bootstrap'

import Image from 'next/image'
import classNames from 'classnames'

import { MockupContext } from '../../helpers/MockProvider'

import scrMeta from '../../../../config/scrMeta.json'

import imageLoader from '../../../../utils/imageLoader'

import { getFrameProps } from '../../helpers/defaults'

import { previewContainer, previewButton, previewImage } from '../../style'

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
        <Container className={previewContainer.className}>
          {scrMeta.ios.map(({ id, name, sizes }, key) => (
            <Button
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
              <Image
                className={previewImage.className}
                src={`/scrPreview/ios/${id}/${sizes[0]}.png`}
                height='90'
                width='60'
                alt='iOS Device Style Preview'
                loader={imageLoader}
              />
            </Button>
          ))}
        </Container>
      </Tab>
      <Tab eventKey='device-style-android' title='Android'>
        <Container className={previewContainer.className}>
          {scrMeta.android.map(({ id, name, sizes }, key) => (
            <Button
              className={classNames(
                'm-1',
                previewButton.className,
                currentMockStore.frameId === id ? 'border-dark' : 'border'
              )}
              variant='outline-light'
              key={key}
              data-type='android'
              data-value={id}
              data-name={name}
              onClick={eventFrame}
            >
              <Image
                className={previewImage.className}
                src={`/scrPreview/android/${id}/${sizes[0]}.png`}
                height='90'
                width='60'
                alt='Android Device Style Preview'
                loader={imageLoader}
              />
            </Button>
          ))}
        </Container>
      </Tab>

      {previewContainer.styles}
      {previewButton.styles}
      {previewImage.styles}
    </Tabs>
  )
}
