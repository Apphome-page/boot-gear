import { useCallback, useContext } from 'react'
import { Tabs, Tab, Container, Button } from 'react-bootstrap'

import dynamic from 'next/dynamic'
import classNames from 'classnames'

import Image from '../../../../components/Tag/Image'

import { MockupContext } from '../../helpers/MockProvider'

import scrBg from '../../../../config/scrBg.json'

import styles from '../../styles.module.scss'

const ColorPicker = dynamic(() => import('../ColorPicker'), {
  ssr: false,
  loading: function LoadingItem() {
    return <div>Please wait till Color-Picker Loads...</div>
  },
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
        <Container className={styles.previewContainer}>
          {scrBg.map(({ path }, index) => {
            const bgPreviewLink = `/scrPreview/bg/${path}`
            return (
              <Button
                key={index}
                variant='outline-light'
                className={classNames('m-1', styles.previewButton, {
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
                  className={styles.previewImage}
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
