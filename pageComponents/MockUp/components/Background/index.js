import { useCallback, useContext } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Panel as ColorPickerPanel } from 'rc-color-picker'

import { MockupContext } from '../../helpers/MockProvider'

import scrBg from '../../../../config/scrBg.json'

import { PreviewContainer, PreviewButton, PreviewImage } from '../../style'

export default function Design() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const eventBgImage = useCallback(
    (e) => {
      let value = ''
      if (e.target.tagName === 'BUTTON') {
        value = e.target.dataset.value
      } else if (
        e.target.tagName === 'IMG' &&
        e.target.parentElement.tagName === 'BUTTON'
      ) {
        value = e.target.parentElement.dataset.value
      }
      if (!value) {
        return
      }
      modCurrentMockUp({
        backgroundImage: value,
      })
    },
    [modCurrentMockUp]
  )

  const eventBgColor = useCallback(
    ({ color }) =>
      modCurrentMockUp({
        backgroundImage: '',
        backgroundColor: color,
      }),
    [modCurrentMockUp]
  )

  return (
    <Tabs defaultActiveKey='image' className='justify-content-center mt-1 mb-3'>
      <Tab eventKey='image' title='Image'>
        <PreviewContainer onClick={eventBgImage}>
          {scrBg.map(({ path }, index) => {
            const bgLink = `/scr/bg/${path}`
            const bgPreviewLink = `/scrPreview/bg/${path}`
            return (
              <PreviewButton
                key={index}
                variant='outline-light'
                className={`m-1${
                  currentMockStore.backgroundImage === bgLink
                    ? ' border-dark'
                    : ' border'
                }`}
                data-value={bgLink}
              >
                <PreviewImage src={bgPreviewLink} height='100' width='100' />
              </PreviewButton>
            )
          })}
        </PreviewContainer>
      </Tab>
      <Tab eventKey='color' title='Color'>
        <ColorPickerPanel
          className='input-group-text my-3 mx-auto p-0'
          enableAlpha={false}
          defaultColor={currentMockStore.backgroundColor}
          color={currentMockStore.backgroundColor}
          onChange={eventBgColor}
        >
          <span className='rc-color-picker-trigger h-100 m-0 p-0 border-0 fsize-32' />
        </ColorPickerPanel>
      </Tab>
    </Tabs>
  )
}
