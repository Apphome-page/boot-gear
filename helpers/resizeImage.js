import Pica from 'pica'

export default function ResizeImage({ blob, extension, size, scale, base }) {
  const pica = Pica()
  return new Promise(function (resolve) {
    var img = new Image()
    var toCanvas = document.createElement('canvas')
    var ctx = toCanvas.getContext('2d', {
      alpha: true,
    })

    img.crossOrigin = 'anonymous'
    img.addEventListener('load', function () {
      if (scale) {
        toCanvas.width = img.width / (base / scale)
        toCanvas.height = img.height / (base / scale)
      } else {
        toCanvas.width = size.width
        toCanvas.height = size.height
      }

      var regexResults = /(image\/.*)/.exec(extension)
      var exportType =
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
        .then(function (result) {
          return pica.toBlob(result, exportType, 0.9)
        })
        .then(resolve)
    })
    img.setAttribute('src', blob)
  })
}
