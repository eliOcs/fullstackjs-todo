"use strict";

const mongoose = require("mongoose");
const config = require("envy").load("backend/config");

mongoose.Promise = global.Promise;

let database = exports;

database.connect = function (next) {
    mongoose.connect(config.database.url, next);
};

database.connection = mongoose.connection;

database.models = {
    User: require("./user"),
    Todo: require("./todo")
};
