/*jslint node, es6, maxlen: 80*/
'use strict';

const mongoose = require('mongoose');

let database = {};

database.connect = function (next) {
    mongoose.connect('mongodb://localhost/todos', next);
};

database.connection = mongoose.connection;

database.models = {};
database.models.Todo = mongoose.model('Todo', new mongoose.Schema({
    title: String,
    completed: Boolean
}));

module.exports = database;
