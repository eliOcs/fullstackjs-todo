/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const async = require('async');
const database = require('./database');

const server = express();
server.use('/', express.static("./frontend/build"));
server.use('/api', require("./api"));

async.series([
    database.connect,
    function startServer(next) {
        server.listen(3000, next);
    }
], function (err) {
    if (err) {
        console.log("Couldn't start server", err);
    } else {
        console.log("Started server");
    }
});
