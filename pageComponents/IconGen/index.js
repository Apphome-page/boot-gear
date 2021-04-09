import { useState, useCallback } from 'react'
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import classNames from 'classnames'

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
      <Container className='my-3 py-3'>
        <Row>
          <Col lg={6}>
            <div
              data-filename={source.name}
              style={{
                backgroundImage: source.url ? `url('${source.url}')` : '',
              }}
              className='icon-source-wrap'
            >
              <input
                type='file'
                accept='image/*'
                aria-label='Image'
                onChange={eventSource}
                className='icon-source'
              />
            </div>
          </Col>
          <Col lg={6} className='icon-options' onClick={eventPlatforms}>
            <small>
              Drag or select an app icon image (1024x1024) to generate different
              app icon sizes for all platforms
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
            <Button
              variant={source.url ? 'primary' : 'secondary'}
              disabled={!source.url}
              onClick={() => {
                setSubShow(true)
              }}
              className='icon-gen w-100 m-3 p-3 cursor-pointer'
            >
              ⬇ Generate
            </Button>
            <ProgressBar value={progress} max='100' className='icon-progress' />
          </Col>
        </Row>
      </Container>
      <style jsx>
        {`
          .icon-source-wrap {
            background-image: ${source.url ? `url('${source.url}')` : ''};
          }
        `}
      </style>
      <style jsx>
        {`
          .icon-source-wrap {
            position: relative;
            margin: auto;
            height: 400px;
            width: 400px;
            border: 1px dashed #ccc;
            border-radius: 5px;
            background-color: #eee;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }
          .icon-source-wrap:not([data-filename]):before {
            content: 'Click or drag image file ( 1024 x 1024 )';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            white-space: nowrap;
          }

          @media (max-width: 768px) {
            .icon-source-wrap {
              width: 100%;
              height: 264px;
            }
          }

          .icon-source-wrap .icon-progress {
            width: 100%;
            background: #eee;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
            border-radius: 3px;
            appearance: none;
          }
          .icon-source-wrap .icon-progress[value] {
            appearance: none;
          }
          .icon-source-wrap .icon-progress:not([value]) {
            appearance: none;
          }
          .icon-source-wrap .icon-progress[value='0'] {
            display: none;
          }
          .icon-source-wrap .icon-progress::-webkit-progress-bar {
            background: #eee;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
            border-radius: 3px;
          }
          .icon-source-wrap .icon-progress::-webkit-progress-value {
            background-color: #6495ed;
            border-radius: 3px;
            transition: width 0.1s ease;
          }
          .icon-source-wrap .icon-progress::-moz-progress-bar {
            background-color: #6495ed;
            border-radius: 3px;
          }

          .icon-source-wrap .icon-gen {
            margin: 24px 0px;
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: #eee;
            color: #999;
          }
          .icon-source-wrap .icon-gen:not([disabled]) {
            border: none;
            background-color: #6495ed;
            color: #fff;
          }
          .icon-source-wrap .icon-source {
            height: 100%;
            width: 100%;
            opacity: 0;
          }

          .icon-source-wrap .icon-options {
            padding: 20px;
          }
          .icon-source-wrap .icon-options label {
            display: block;
            margin: 8px 28px;
          }
          .icon-source-wrap .icon-options input[data-platform] {
            margin-right: 8px;
            height: 18px;
            width: 18px;
            vertical-align: middle;
          }
        `}
      </style>
    </>
  )
}
