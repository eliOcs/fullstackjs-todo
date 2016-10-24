"use strict";

const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const database = require("./database");
const passport = require("passport");
const session = exports;

function setupUserSessionSerialization() {
    const User = database.models.User;

    passport.serializeUser(function (user, next) {
        next(null, user.id);
    });

    passport.deserializeUser(function (id, next) {
        User.findById(id, next);
    });
}

session.initialize = function () {

    setupUserSessionSerialization();

    return [
        expressSession({
            name: "todo-session",
            secret: "l33tp4sw0rd",
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

session.requireActiveSession = function (req, res, next) {
    if (req.user) {
        return next();
    }

    res.status(401).send();
};
