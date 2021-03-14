import Pica from 'pica'

export default function ResizeImage({ blob, extension, size, scale, base }) {
  const pica = new Pica({
    features: ['all'],
  })
  return new Promise((resolve) => {
    const img = new Image()
    const toCanvas = document.createElement('canvas')
    const ctx = toCanvas.getContext('2d', {
      alpha: true,
    })

    img.crossOrigin = 'anonymous'
    img.addEventListener('load', () => {
      if (scale) {
        toCanvas.width = img.width / (base / scale)
        toCanvas.height = img.height / (base / scale)
      } else {
        toCanvas.width = size.width
        toCanvas.height = size.height
      }

      const regexResults = /(image\/.*)/.exec(extension)
      const exportType =
        regexResults && regexResults.length > 1 ? regexResults[1] : 'image/png'

      if (exportType === 'image/svg+xml') {
        ctx.drawImage(img, 0, 0, toCanvas.width, toCanvas.height)
        return toCanvas.toBlob(resolve)
      }

      return pica
        .resize(img, toCanvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
          alpha: true,
        })
        .then((result) => pica.toBlob(result, exportType, 0.8))
        .then(resolve)
    })
    img.setAttribute('src', blob)
  })
}
