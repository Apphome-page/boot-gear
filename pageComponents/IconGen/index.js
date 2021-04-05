import { useState, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

import { IconSource, IconGen, Progress, Source, Options } from './style'

const Subscription = dynamic(() => import('../../components/Subscription'), {
  ssr: false,
})

const defaultPlatforms = {
  iphone: {
    name: 'iPhone',
    subtitle: '11 different sizes',
  },
  ipad: {
    name: 'iPad',
    subtitle: '13 different sizes',
  },
  watch: {
    name: 'Watch',
    subtitle: '8 different sizes',
  },
  mac: {
    name: 'Mac',
    subtitle: '11 different sizes',
  },
  android: {
    name: 'Android',
    subtitle: '4 different sizes',
  },
}

export default function AppIcon({ preset = [] }) {
  const [source, updateSource] = useState({})
  const [subShow, setSubShow] = useState(false)
  const [platforms, updatePlatforms] = useState({
    ...defaultPlatforms,
    stores: {},
  })
  const [progress, updateProgress] = useState(0)

  const eventSource = useCallback((e) => {
    if (e.target.files.length < 1) {
      return
    }
    const { name, type } = e.target.files[0]
    updateSource({
      name,
      type,
      url: window.URL.createObjectURL(e.target.files[0]),
    })
  }, [])

  const eventPlatforms = useCallback(
    (e) => {
      const {
        tagName,
        checked,
        dataset: { platform: value },
      } = e.target
      if (tagName !== 'INPUT') {
        return
      }
      if (platforms[value] && !checked) {
        updatePlatforms(
          ({ [value]: deleteValue, ...restPlatforms }) => restPlatforms
        )
      } else if (!platforms[value] && checked) {
        updatePlatforms((oldPlatforms) => ({ ...oldPlatforms, [value]: true }))
      }
    },
    [platforms]
  )

  const eventGenerate = useCallback(async () => {
    if (!source.url) {
      return
    }

    updateProgress(0)

    const [
      { default: ResizeImage },
      { default: AppIconSizes },
    ] = await Promise.all([
      import('../../utils/resizeImage'),
      import('../../config/appIconSizes.json'),
    ])

    const validPlatforms = Object.keys(platforms)
    const progressDelta =
      parseInt(
        validPlatforms.reduce(
          (total, platform) => total + AppIconSizes[platform].length,
          0
        ) / 50,
        10
      ) || 1
    const resizePromise = async (size, filename) => {
      const raw = await ResizeImage({
        blob: source.url,
        extension: source.extension,
        size: {
          width: size['expected-size'],
          height: size['expected-size'],
        },
      })
      updateProgress((pState) => pState + progressDelta)
      return {
        raw,
        filename,
      }
    }

    updateProgress(10)

    const promises = []
    validPlatforms.forEach((platform) => {
      AppIconSizes[platform].forEach((size) => {
        let filename =
          platform === 'android' ? 'ic_launcher.png' : size.filename
        if (size.folder) {
          filename = `${size.folder}/${filename}`
        }
        promises.push(resizePromise(size, filename))
      })
    })

    const files = await Promise.all(promises)

    updateProgress(70)

    const [{ default: JSZip }, { saveAs }] = await Promise.all([
      import('jszip'),
      import('file-saver'),
    ])

    updateProgress(75)

    const zip = new JSZip()
    const json = {
      filename: 'Assets.xcassets/AppIcon.appiconset/Contents.json',
      raw: JSON.stringify(
        validPlatforms
          .filter((p) => p !== 'android' && p !== 'stores')
          .reduce((a, p) => a.concat(AppIconSizes[p]), [])
      ),
    }

    updateProgress(80)
    files.concat(json).forEach((file) => {
      zip.file(file.filename, file.raw)
    })

    const zipBundle = await zip.generateAsync({
      type: 'blob',
    })

    updateProgress(90)
    saveAs(zipBundle, 'AppIcons.zip')
    updateProgress(0)
  }, [platforms, source])

  return (
    <>
      <Subscription
        show={subShow}
        onComplete={() => {
          setSubShow(false)
          eventGenerate()
        }}
      />
      <Container className='my-4 py-4'>
        <Row>
          <Col lg={6}>
            <Source
              data-filename={source.name}
              style={{
                backgroundImage: source.url ? `url('${source.url}')` : '',
              }}
            >
              <IconSource
                type='file'
                accept='image/*'
                aria-label='Image'
                onChange={eventSource}
              />
            </Source>
          </Col>
          <Col lg={6}>
            <Options onClick={eventPlatforms}>
              <small>
                Drag or select an app icon image (1024x1024) to generate
                different app icon sizes for all platforms
              </small>
              <hr />
              <div className='d-flex flex-column'>
                {Object.keys(defaultPlatforms).map((platform, key) => {
                  const isChecked = preset.length
                    ? preset.includes(platform.toLowerCase())
                    : true

                  return (
                    <div
                      key={key}
                      className={classNames({
                        'order-first': isChecked,
                      })}
                    >
                      <input
                        data-platform={platform}
                        type='checkbox'
                        defaultChecked={isChecked}
                      />
                      <em>{defaultPlatforms[platform].name}</em>
                      <small> - {defaultPlatforms[platform].subtitle}</small>
                    </div>
                  )
                })}
              </div>
              <IconGen
                disabled={!source.url}
                onClick={() => {
                  setSubShow(true)
                }}
              >
                ⬇ Generate
              </IconGen>
              <Progress value={progress} max='100' />
            </Options>
          </Col>
        </Row>
      </Container>
    </>
  )
}
