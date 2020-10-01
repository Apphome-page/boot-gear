export default function wrapCanvasText(
  context,
  {
    text = '',
    x = 0,
    y = 0,
    maxWidth = context.canvas.width,
    size = 16,
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
  context.font = `${size}px ${face}`
  context.textAlign = align
  text.split(' ').forEach((word, index) => {
    const testline = `${line}${word} `
    const testWidth = context.measureText(testline).width
    if (testWidth > maxWidth && index > 0) {
      context.fillText(line, x, paraHeight)
      line = `${word} `
      paraHeight += lineHeight
    } else {
      line = testline
    }
  })
  if (line) {
    context.fillText(line, x, paraHeight)
  }
  context.restore()
  return paraHeight
}
