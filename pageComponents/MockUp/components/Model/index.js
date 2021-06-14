import { useCallback, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'

import classNames from 'classnames'

import Image from '../../../../components/ImageTag'

import { MockupContext } from '../../helpers/MockProvider'
import { getFrameProps } from '../../helpers/defaults'

import scrMeta from '../../../../config/scrMeta.json'

import styles from '../../styles.module.scss'

export default function Design() {
  const {
    data: mockStore,
    current: currentMockUp,
    modCurrent: modCurrentMockUp,
  } = useContext(MockupContext)

  const currentMockStore = mockStore[currentMockUp]

  const eventModel = useCallback(
    ({
      currentTarget: {
        dataset: { value },
      },
    }) => {
      const { frameType, frameId, height: maxHeight } = currentMockStore
      if (!value) {
        return
      }
      modCurrentMockUp({
        ...getFrameProps(frameType, frameId, {
          maxHeight,
          frameDevice: value,
        }),
      })
    },
    [currentMockStore, modCurrentMockUp]
  )

  return (
    <Container className='text-center'>
      {scrMeta[currentMockStore.frameType]
        .find(({ id }) => id === currentMockStore.frameId)
        .sizes.map((model, key) => (
          <Button
            className={classNames(
              'm-1',
              styles.previewButton,
              currentMockStore.frameDevice === model ? 'border-dark' : 'border'
            )}
            variant='outline-light'
            key={key}
            data-value={model}
            data-name={model
              .replace(/(\d+)/g, ' $1')
              .replace(/_/g, ' ')
              .replace('custom', '')}
            onClick={eventModel}
          >
            <Image
              className={styles.previewImage}
              src={`/scrPreview/${currentMockStore.frameType}/${currentMockStore.frameId}/${model}.png`}
              alt='Device Model'
              height='90'
              width='60'
            />
          </Button>
        ))}
    </Container>
  )
}
