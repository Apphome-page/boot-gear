// import scrFence from '../config/scrFence.json'

export function renderText(
  context,
  {
    text = '',
    x = 0,
    y = 0,
    maxWidth = context.canvas.width,
    size = 16,
    weight = '600',
    face = 'Times New Roman',
    color = '#333',
    align = 'center',
    lineHeight = size * 1.2,
  }
) {
  if (!context || !text) {
    return 0
  }
  let line = ''
  let paraHeight = y
  context.save()
  context.fillStyle = color
  context.font = `${weight} ${size}px ${face}`
  context.textAlign = align
  text.split(' ').forEach((word, index) => {
    const testline = `${line}${word} `
    const testWidth = context.measureText(testline).width
    if (testWidth > maxWidth && index > 0) {
      context.fillText(line.slice(0, -1), x, paraHeight)
      line = `${word} `
      paraHeight += lineHeight
    } else {
      line = testline
    }
  })
  if (line) {
    context.fillText(line.replace(/\s+$/i, ''), x, paraHeight)
  }
  context.restore()
  return paraHeight
}

export function renderImage(
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
        context.drawImage(...drawParams)
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

export default async function render(ctx, renderValues) {
  const {
    heading,
    headingColor,
    headingFont,
    headingSize,
    headingPosX,
    headingPosY,
    frame,
    framePosX,
    framePosY,
    frameWidth,
    frameHeight,
    frameRot,
    screenshot,
    screenshotPosX,
    screenshotPosY,
    screenshotWidth,
    screenshotHeight,
    screenshotRot,
    width,
    height,
    backgroundColor,
    backgroundImage,
  } = renderValues
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = backgroundColor
  ctx.fill()
  ctx.restore()
  await (backgroundImage &&
    renderImage(ctx, {
      url: backgroundImage,
      posX: 0,
      posY: 0,
      rot: 0,
      width,
      height,
    }))
  await renderImage(ctx, {
    url: screenshot,
    posX: screenshotPosX,
    posY: screenshotPosY,
    rot: screenshotRot,
    width: screenshotWidth,
    height: screenshotHeight,
  })
  await renderImage(ctx, {
    url: frame,
    posX: framePosX,
    posY: framePosY,
    rot: frameRot,
    width: frameWidth,
    height: frameHeight,
  })
  if (heading && headingSize) {
    renderText(ctx, {
      text: heading,
      x: headingPosX,
      y: headingPosY,
      size: headingSize,
      face: headingFont,
      color: headingColor,
    })
  }

  // const fenceZones = Object.keys(scrFence)
  // const fenceAttributes = [].concat(
  //   ...fenceZones.map((fenceZone) => scrFence[fenceZone])
  // )
  // const isFenced = fenceAttributes.reduce((accFence, fenceObj) => {
  //   if (accFence) {
  //     return accFence
  //   }
  //   const fenceAttribute = (Object.keys(fenceObj) || [])[0]
  //   if (!fenceAttribute) {
  //     return accFence
  //   }
  //   const fencedValues = fenceObj[fenceAttribute]
  //   const renderValue = renderValues[fenceAttribute]
  //   return Array.isArray(fencedValues)
  //     ? fencedValues.includes(renderValue)
  //     : !!renderValue
  // }, false)

  // if (isFenced) {
  //   ctx.save()
  //   ctx.globalCompositeOperation = 'difference'
  //   renderText(ctx, {
  //     text: 'applanding.page',
  //     x: width / 2,
  //     y: height / 2,
  //     size: 28,
  //     weight: 800,
  //     face: 'monospace',
  //     color: '#ffffff99',
  //   })
  //   ctx.restore()
  // }
}
