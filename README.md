# png-to-jpeg [![Build Status](https://travis-ci.org/marekventur/png-to-jpeg.svg?branch=master)](https://travis-ci.org/marekventur/png-to-jpeg)

> A imagemin-compatible png-to-jpeg converter in pure javascript


## Install

```
$ npm install --save png-to-jpeg
```


## Usage

With imagemin:
```js
const imagemin = require('imagemin');
const pngToJpeg = require('png-to-jpeg');

imagemin(['images/*.png'], 'build/images', {
    plugins: [
        pngToJpeg({quality: 90})
    ]
}).then((files) => {
    // Please keep in mind that all files now have the wrong extension
    // You might want to change them manually
    console.log('PNGs converted to JPEGs:', files);
});
```

Or manually:
```js
const fs = require("fs");
const pngToJpeg = require('png-to-jpeg');

let buffer = fs.readFileSync("./some-file.png");
pngToJpeg({quality: 90})(buffer)
.then(output => fs.writeFileSync("./some-file.jpeg", output));

```

## API

### pngToJpeg([options])(buffer)

#### options

##### quality

Type: `integer`<br>
Default: `50`

Set a quality preset. Any integer between 1 - 100 is allowed.

#### buffer

Type: `buffer`

Buffer to optimize.

## License

MIT © Marek Ventur <marekventur@gmail.com>