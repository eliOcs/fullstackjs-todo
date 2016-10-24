"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let database = exports;

database.connect = function (next) {
    mongoose.connect("mongodb://localhost/todos", next);
};

database.connection = mongoose.connection;

database.models = {
    User: require("./user"),
    Todo: require("./todo")
};
