export default function canvasImage(
  context,
  { url, posX, posY, rot = 0, width, height }
) {
  if (!context || !url) {
    return Promise.resolve()
  }
  const rotRad = (rot * Math.PI) / 180
  context.save()
  //  draw these as Promise
  return new Promise((resolve, reject) => {
    Object.assign(new Image(), {
      src: url,
      height,
      width,
      onload: ({ target }) => {
        if (rotRad) {
          context.translate(posX + width / 2, posY + height / 2)
          context.rotate(rotRad)
        }
        const drawParams = [
          target,
          0,
          0,
          target.naturalWidth,
          target.naturalHeight,
          rotRad ? -width / 2 : posX,
          rotRad ? -height / 2 : posY,
          width,
          height,
        ]
        // console.log(drawParams)
        context.drawImage(...drawParams)
        // return final Y
        context.restore()
        return resolve()
      },
      onerror: () => {
        context.restore()
        return reject()
      },
    })
  })
}
