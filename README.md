## imagemin-jimp

use [jimp](https://www.npmjs.com/package/jimp) to resize images.


### install
```js
npm install --save imagemin-jimp
```

### usage
```js
const jimpOptions = {
  width: 500,
  height: 500,
}

imagemin(input, output, {
  plugins: [
    imageminJimp(jimpOptions),
  ],
})
```

[npm-image]: https://img.shields.io/npm/v/jaeh/imagemin-jimp.svg
[npm-url]: https://www.npmjs.com/package/jaeh/imagemin-jimp
[travis-image]: https://api.travis-ci.org/jaeh/imagemin-jimp.svg?branch=master
[travis-url]: https://travis-ci.org/jaeh/imagemin-jimp
[appveyor-image]: https://img.shields.io/appveyor/ci/jaeh/imagemin-jimp/master.svg
[appveyor-url]: https://ci.appveyor.com/project/jaeh/imagemin-jimp/branch/master
[coveralls-image]: https://coveralls.io/repos/github/jaeh/imagemin-jimp/badge.svg
[coveralls-url]: https://coveralls.io/github/jaeh/imagemin-jimp
[greenkeeper-image]: https://badges.greenkeeper.io/jaeh/imagemin-jimp.svg
[greenkeeper-url]: https://greenkeeper.io
