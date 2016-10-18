/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const session = require('./session');
const path = require('path');

const server = express();

server.use(session.initialize());

server.use('/', express.static("./frontend/build"));
server.use('/api', require("./api"));
server.get('*', function (req, res) {
    res.sendFile(path.resolve('./frontend/build/index.html'));
});

module.exports.listen = function (next) {
    server.listen(3000, next);
}
