/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const async = require('async');
const bcrypt = require('bcrypt');
const passport = require('passport');
const database = require('../../database');
const User = database.models.User;
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function (email, password, next) {
        async.auto({
            find_user_by_email: User.findOne.bind(User, {email}),
            validate_password: ['find_user_by_email', function (results, next) {
                const user = results.find_user_by_email;

                if (!user) {
                    // user doesn't exist
                    return next(false);
                }

                bcrypt.compare(password, user.get("_password_hash"), next);
            }]
        }, function (err, results) {
            if (err) {
                return next(err);
            }

            if (results.validate_password) {
                next(null, results.find_user_by_email);
            } else {
                next(null, false);
            }
        });
    }
));

const router = new express.Router();

router.post(
    '/signin',
    passport.authenticate('local'),
    function (req, res) {
        res.json(req.user);
    }
);


router.post('/signup', function (req, res, next) {

    const password = req.body.password;
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    function setPasswordHash(next) {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.set("_password_hash", hash);
            next();
        });
    }

    async.series([
        setPasswordHash,
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
