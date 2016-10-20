/*jslint node, es6, maxlen: 80*/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let database = exports;

database.connect = function (next) {
    mongoose.connect('mongodb://localhost/todos', next);
};

database.connection = mongoose.connection;

database.models = {};

function removePrivateKeys(doc, ret, options) {
    const privateKeys = Object.keys(ret).filter((key) => key.startsWith("_"));
    privateKeys.forEach((key) => delete ret[key]);
    return ret;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    "_password_hash": {
        type: String,
        required: true
    }
    // TODO: add a new property to hold the github id
});
UserSchema.set('toJSON', {virtuals: true, transform: removePrivateKeys});
database.models.User = mongoose.model('User', UserSchema);

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
    // TODO: Add a new property to hold the owner of this todo
});
TodoSchema.set('toJSON', {virtuals: true, transform: removePrivateKeys});
database.models.Todo = mongoose.model('Todo', TodoSchema);
