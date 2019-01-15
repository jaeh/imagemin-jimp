const fs = require('fs')
const path = require('path')

const { is, tryCatch } = require('@magic/test')
const imageminJimp = require('../src/index.js')

const fixtures = path.join(__dirname, '.fixtures')
const originalImageBuffer = fs.readFileSync(path.join(fixtures, 'magic.png'))
const landscapeImageBuffer = fs.readFileSync(path.join(fixtures, 'landscape.png'))
const portraitImageBuffer = fs.readFileSync(path.join(fixtures, 'portrait.png'))

const options = { width: 50, height: 50 }

module.exports = [
  {
    fn: () => imageminJimp(options)(originalImageBuffer),
    expect: is.buffer,
    info: 'imagemin returns an object',
  },
  {
    fn: () => imageminJimp(options)(originalImageBuffer),
    expect: is.len.gt(originalImageBuffer),
    info: 'buffer length is smaller for resized images',
  },
  {
    fn: () => imageminJimp({ width: 100, height: 100 })(originalImageBuffer),
    expect: res => res.length <= originalImageBuffer.length,
    info: 'will not make images bigger with default setting',
  },
  {
    fn: () => imageminJimp({ width: 200, height: 200, grow: true })(originalImageBuffer),
    expect: is.len.lt(originalImageBuffer),
    info: 'will make images bigger if options.grow === true',
  },
  {
    fn: tryCatch(() => imageminJimp({ width: 1, height: 1 })(undefined)),
    expect: is.error,
    info: 'calling imageminJimp without buffer rejects',
  },
  {
    fn: tryCatch(() => imageminJimp({ width: 10, height: 10 })(undefined)),
    expect: e => e.stack.startsWith('TypeError: Expected a buffer'),
    info: 'calling imageminJimp without buffer returns a TypeError',
  },
  {
    fn: tryCatch(() => imageminJimp({ width: 0, height: 0 })(originalImageBuffer)),
    expect: is.deep.equal(originalImageBuffer),
    info: 'options.width <= 0 and options.height <= 0 returns the buffer',
  },
  {
    fn: () => imageminJimp({ width: 20 })(landscapeImageBuffer),
    expect: is.len.gt(landscapeImageBuffer),
    info: 'landscape gets resized',
  },
  {
    fn: () => imageminJimp({ height: 20 })(landscapeImageBuffer),
    expect: is.len.gt(landscapeImageBuffer),
    info: 'landscape gets resized',
  },
  {
    fn: () => imageminJimp({ width: 20 })(portraitImageBuffer),
    expect: is.len.gt(portraitImageBuffer),
    info: 'portrait gets resized',
  },
  {
    fn: () => imageminJimp({ height: 20 })(portraitImageBuffer),
    expect: is.len.gt(portraitImageBuffer),
    info: 'portrait gets resized',
  },
]
