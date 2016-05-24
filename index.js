"use strict";

const Png = require("png-js");
const Jpeg = require("jpeg-js");
const pify = require("pify");

module.exports = opts => {
    opts = Object.assign({quality: 50}, opts);

    if (!Number.isInteger(opts.quality)) {
        return Promise.reject(new Error("'quality' only accepts integers"));
    }

    if (opts.quality < 1 || opts.quality > 100) {
        return Promise.reject(new Error("'quality' has to be between 1-100"));
    }

    return buf => {
        let png = new Png(buf);
        return new Promise(resolve => png.decode(resolve))
        .then(data => Jpeg.encode({data, width: png.width, height: png.height}, opts.quality).data);
    }
}