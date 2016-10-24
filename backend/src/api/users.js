"use strict";

const express = require("express");
const session = require("../session");

const router = new express.Router();

router.get(
    "/me",
    session.requireActiveSession,
    function (req, res) {
        res.json(req.user);
    }
);

module.exports = router;
