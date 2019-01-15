const Jimp = require('jimp')

module.exports = options => data => {
  options = Object.assign(
    {
      width: Jimp.AUTO, // maximum width for images
      height: Jimp.AUTO, // maximum height for images
      grow: false, // never make images larger than they are.
    },
    options,
  )

  // do not resize if width and height are not set
  // Jimp.AUTO === -1
  if (options.width <= 0 && options.height <= 0) {
    return data
  }

  if (!Buffer.isBuffer(data)) {
    return Promise.reject(new TypeError('Expected a buffer'))
  }

  return Jimp.read(data)
    .then(img => {
      let w = options.width
      let h = options.height
      const isPortrait = img.bitmap.width > img.bitmap.height

      // image should not grow
      if (!options.grow) {
        if (img.bitmap.width < options.width) {
          w = img.bitmap.width
        }
        if (img.bitmap.height < options.height) {
          h = img.bitmap.height
        }
      }

      // setting the smaller dimension to auto to prevent stretching
      if (isPortrait) {
        if (h !== Jimp.AUTO) {
          w = Jimp.AUTO
        }
      } else {
        if (w !== Jimp.AUTO) {
          h = Jimp.AUTO
        }
      }

      return img
          .resize(w, h)
          .getBufferAsync(Jimp.AUTO)
    })
}