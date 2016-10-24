"use strict";

const express = require("express");
const parser = require("body-parser");

const router = new express.Router();

router.use(parser.json());

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/todos", require("./todos"));

router.use(function handleErrors(err, req, res, next) {
    res.status(500).json({
        title: "Internal server error",
        message: err.message
    });
});

module.exports = router;
