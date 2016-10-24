"use strict";

const express = require("express");
const session = require("./session");

const server = express();

server.use(session.initialize());

server.use("/api", require("./api"));
server.use("/", require("./frontend"));

module.exports.listen = function (next) {
    server.listen(3000, next);
};
