/*jslint node, es6, maxlen: 80*/
'use strict';

const crypto = require('crypto');
const util = exports;

util.hash = function (data) {
    const hashBuilder = crypto.createHash("sha1");
    hashBuilder.update(JSON.stringify(data));
    return hashBuilder.digest("base64");
};
