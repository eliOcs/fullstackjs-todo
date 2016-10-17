/*jslint node, es6, maxlen: 80*/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let database = {};

database.connect = function (next) {
    mongoose.connect('mongodb://localhost/todos', next);
};

database.connection = mongoose.connection;

database.models = {};

database.models.User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    "_password_hash": String
}));

database.models.Todo = mongoose.model('Todo', new mongoose.Schema({
    title: String,
    completed: Boolean,
    "_user": {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}));

module.exports = database;
