import { useState, useCallback } from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import ResizeImage from '../../helpers/resizeImage'

import AppIconSizes from '../../config/appIconSizes.json'

import {
  IconSource,
  IconGen,
  Progress,
  Source,
  Options,
} from '../../styles/components/appicon'

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

export default function AppIcon() {
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

  const eventGenerate = useCallback(() => {
    if (!source.url) {
      return
    }
    updateProgress(0)
    const validPlatforms = Object.keys(platforms)
    const json = {
      filename: 'Assets.xcassets/AppIcon.appiconset/Contents.json',
      raw: JSON.stringify(
        validPlatforms
          .filter((p) => p !== 'android' && p !== 'stores')
          .reduce((a, p) => a.concat(AppIconSizes[p]), [])
      ),
    }
    const progressDelta =
      parseInt(
        validPlatforms.reduce(
          (total, platform) => total + AppIconSizes[platform].length,
          0
        ) / 50,
        10
      ) || 1

    updateProgress(10)

    Promise.all(
      validPlatforms.reduce(
        (promises, platform) => {
          AppIconSizes[platform].forEach((size) => {
            let filename =
              platform === 'android' ? 'ic_launcher.png' : size.filename
            if (size.folder) {
              filename = `${size.folder}/${filename}`
            }
            promises.push(
              ResizeImage({
                blob: source.url,
                extension: source.extension,
                size: {
                  width: size['expected-size'],
                  height: size['expected-size'],
                },
              }).then((image) => {
                updateProgress((pState) => pState + progressDelta)
                return {
                  raw: image,
                  filename,
                }
              })
            )
          })
          return promises
        },
        [import('jszip')]
      )
    )
      .then(([{ default: JSZip }, ...files]) => {
        updateProgress(70)
        const zip = new JSZip()
        files.concat(json).forEach((file) => {
          zip.file(file.filename, file.raw)
        })
        return Promise.all([
          import('file-saver'),
          zip.generateAsync({
            type: 'blob',
          }),
        ])
      })
      .then(([{ saveAs }, zip]) => {
        updateProgress(90)
        saveAs(zip, 'AppIcons.zip')
        updateProgress(0)
      })
  }, [platforms, source])

  return (
    <>
      <Head>
        <title>App Icon Generator</title>
      </Head>
      <Subscription
        show={subShow}
        onComplete={() => {
          setSubShow(false)
          eventGenerate()
        }}
      />
      <Jumbotron fluid className='bg-transparent'>
        <Container className='text-center'>
          <h1>App Icon Generator</h1>
        </Container>
      </Jumbotron>
      <Container className='my-4 py-4 min-vh-100'>
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
              {Object.keys(defaultPlatforms).map((platform, key) => (
                <label key={key}>
                  <input
                    data-platform={platform}
                    type='checkbox'
                    defaultChecked
                  />
                  <em>{defaultPlatforms[platform].name}</em>
                  <small> - {defaultPlatforms[platform].subtitle}</small>
                </label>
              ))}
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
