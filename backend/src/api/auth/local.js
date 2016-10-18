/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const async = require('async');
const passport = require('passport');
const util = require('../../util');
const database = require('../../database');
const User = database.models.User;
const LocalStrategy = require('passport-local').Strategy;

function generatePasswordHash(password, user) {
    return util.hash({
        password: password,
        salt: `l33tp4sw0rd#${password.length}#${user.id}`
    });
}

function validatePassword(password, user) {
    return user.get("_password_hash") === generatePasswordHash(password, user);
}

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, next) {
    User.findOne({email}, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user || !validatePassword(password, user)) {
            return next(null, false);
        }

        next(null, user);
    });
}));

const router = new express.Router();

router.post(
    '/signin',
    passport.authenticate('local'),
    function (req, res) {
        res.json(req.user);
    }
);

router.post('/signup', function (req, res, next) {

    const name = req.body.name;
    const email = req.body.email;
    const user = new User({name, email});

    const password = req.body.password;
    const passwordHash = generatePasswordHash(password, user);
    user.set("_password_hash", passwordHash);

    async.series([
        user.save.bind(user),
        req.login.bind(req, user)
    ], function (err) {
        if (err) {
            return next(err);
        }

        res.status(201).json(user);
    });

});

module.exports = router;
