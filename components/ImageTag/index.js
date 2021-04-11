import { useMemo } from 'react'
import { useAmp } from 'next/amp'
import Image from 'next/image'

const validAmpImgProps = [
  'src',
  'srcset',
  'sizes',
  'alt',
  'attribution',
  'fallback',
  'heights',
  'layout',
  'media',
  'noloading',
  'on',
  'placeholder',
  'sizes',
  'width',
  'height',
  'class',
]

function imageLoader({ src = '/img/logo.png', width = -1, quality = -1 }) {
  return `${src}?w=${width}&q=${quality}`
}

export default function ImageTag(props) {
  const isAmp = useAmp()
  const imageProps = useMemo(() => {
    const newProps = { alt: '', ...props }
    if (isAmp) {
      if (newProps.className) {
        newProps.class = newProps.className
        delete newProps.className
      }
      Object.keys(newProps).forEach((newProp) => {
        if (
          newProp.indexOf('data-') !== 0 &&
          !validAmpImgProps.includes(newProp)
        ) {
          delete newProps[newProp]
        }
      })
    } else if (!newProps.loaders) {
      newProps.loader = imageLoader
    }
    return newProps
  }, [isAmp, props])
  const ImageComponent = useMemo(() => (isAmp ? 'amp-img' : Image), [isAmp])
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ImageComponent {...imageProps} />
}
