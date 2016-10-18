/*jslint node, es6, maxlen: 80*/
'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const database = require('./database');
const passport = require('passport');

module.exports = function createSession() {
    return [
        session({
            name: 'todo-session',
            secret: 'l33tp4sw0rd',
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: database.connection
            })
        }),
        passport.initialize(),
        passport.session()
    ];
};

const User = database.models.User;

passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    User.findById(id, next);
});
