/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');

const server = express();
server.use('/', express.static("./frontend/build"));
server.listen(3000, () => console.log('Server is running'));
