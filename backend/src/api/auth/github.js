/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const database = require('../../database');
const User = database.models.User;

const router = new express.Router();

passport.use(new GitHubStrategy(
    {
        clientID: '67328b9371b1392ac68e',
        clientSecret: '6ba52d89ef0f4dbc72580dedc653f92c84302076',
        callbackURL: 'http://localhost:3000/api/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, next) {
        User.findOne({"_github_id": profile.id}, function (err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                return next(null, user);
            }

            user = new User({
                "_github_id": profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
            user.save(function (err) {
                if (err) {
                    return next(err);
                }

                next(null, user);
            });
        });
    }
));

router.get('/', passport.authenticate('github', {scope: ['user:email']}));

router.get(
    '/callback',
    passport.authenticate('github'),
    function (req, res) {
        res.redirect('/');
    }
);

module.exports = router;
