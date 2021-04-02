import { useCallback, useContext } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import classNames from 'classnames'

import { MockupContext } from '../../helpers/MockProvider'

import scrMeta from '../../../../config/scrMeta.json'

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
    (e) => {
      const { height: maxHeight } = currentMockStore
      let value = ''
      let type = ''
      if (e.target.tagName === 'BUTTON') {
        value = e.target.dataset.value
        type = e.currentTarget.dataset.type
      } else if (
        e.target.tagName === 'IMG' &&
        e.target.parentElement.tagName === 'BUTTON'
      ) {
        value = e.target.parentElement.dataset.value
        type = e.currentTarget.dataset.type
      }
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
        <PreviewContainer onClick={eventFrame} data-type='ios'>
          {scrMeta.ios.map(({ id, name, sizes }, key) => (
            <PreviewButton
              className={classNames(
                'm-1',
                currentMockStore.frameId === id ? 'border-dark' : 'border'
              )}
              variant='outline-light'
              key={key}
              data-value={id}
              data-name={name}
            >
              <PreviewImage
                src={`/scrPreview/ios/${id}/${sizes[0]}.png`}
                height='100'
                width='100'
                alt='iOS Device Style Preview'
              />
            </PreviewButton>
          ))}
        </PreviewContainer>
      </Tab>
      <Tab eventKey='device-style-android' title='Android'>
        <PreviewContainer onClick={eventFrame} data-type='android'>
          {scrMeta.android.map(({ id, name, sizes }, key) => (
            <PreviewButton
              className={classNames(
                'm-1',
                currentMockStore.frameId === id ? 'border-dark' : 'border'
              )}
              variant='outline-light'
              key={key}
              data-value={id}
              data-name={name}
            >
              <PreviewImage
                src={`/scrPreview/android/${id}/${sizes[0]}.png`}
                height='100'
                width='100'
                alt='Android Device Style Preview'
              />
            </PreviewButton>
          ))}
        </PreviewContainer>
      </Tab>
    </Tabs>
  )
}
