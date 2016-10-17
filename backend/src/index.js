/*jslint node, es6, maxlen: 80*/
'use strict';

const async = require('async');
const database = require('./database');
const server = require('./server');

async.series([
    database.connect,
    server.listen
], function (err) {
    if (err) {
        console.log("Couldn't start server", err);
    } else {
        console.log("Started server");
    }
});
