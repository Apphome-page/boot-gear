import { useCallback, useContext } from 'react'
import { Tabs, Tab, Container, Button } from 'react-bootstrap'
import { Code as CodeLoader } from 'react-content-loader'
import Image from 'next/image'

import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { MockupContext } from '../../helpers/MockProvider'

import scrBg from '../../../../config/scrBg.json'

import imageLoader from '../../../../utils/imageLoader'

const ColorPicker = dynamic(() => import('../ColorPicker'), {
  ssr: false,
  loading: CodeLoader,
})

export default function Design() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const eventBgImage = useCallback(
    ({
      currentTarget: {
        dataset: { value },
      },
    }) => {
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
    (color) =>
      modCurrentMockUp({
        backgroundImage: '',
        backgroundColor: color.hex,
      }),
    [modCurrentMockUp]
  )

  return (
    <Tabs defaultActiveKey='image' className='justify-content-center mt-1 mb-3'>
      <Tab eventKey='image' title='Image'>
        <Container className='preview-container'>
          {scrBg.map(({ path }, index) => {
            const bgPreviewLink = `/scrPreview/bg/${path}`
            return (
              <Button
                key={index}
                variant='outline-light'
                className={classNames('m-1', 'preview-button', {
                  'border-dark':
                    currentMockStore.backgroundImage === bgPreviewLink,
                  border: currentMockStore.backgroundImage === bgPreviewLink,
                })}
                data-value={bgPreviewLink}
                onClick={eventBgImage}
              >
                <Image
                  src={bgPreviewLink}
                  height='90'
                  width='60'
                  loader={imageLoader}
                  className='preview-image'
                />
              </Button>
            )
          })}
        </Container>
      </Tab>
      <Tab eventKey='color' title='Color'>
        <ColorPicker
          color={currentMockStore.backgroundColor}
          onChange={eventBgColor}
        />
      </Tab>
    </Tabs>
  )
}
