/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const session = require('../session');

const router = new express.Router();

router.get(
    '/me',
    session.requireActiveSession,
    function (req, res, next) {
        res.json(req.user);
    }
);

module.exports = router;
