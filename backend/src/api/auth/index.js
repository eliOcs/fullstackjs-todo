"use strict";

const express = require("express");
const router = new express.Router();
const session = require("../../session");

router.use("/local", require("./local"));
router.use("/github", require("./github"));

router.post(
    "/signout",
    session.requireActiveSession,
    function (req, res) {
        req.logout();
        res.status(200).send();
    }
);

module.exports = router;
