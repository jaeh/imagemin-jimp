const Jimp = require('jimp')

module.exports = options => data => {
  options = Object.assign(
    {
      width: 2000,
      height: 1000,
    },
    options,
  )

  if (!Buffer.isBuffer(data)) {
    return Promise.reject(new TypeError('Expected a buffer'))
  }

  return Jimp.read(data)
    .then(img => {
      if (img.bitmap.width < options.width && img.bitmap.width < options.height) {
        return data
      }

      if (img.bitmap.height < options.height) {
        options.height = Jimp.AUTO
      } else if (img.bitmap.width < options.width) {
        options.width = Jimp.AUTO
      }

      return img
          .resize(options.width, options.height)
          .getBufferAsync(Jimp.AUTO)
    })
}