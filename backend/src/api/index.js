/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const database = require('../database');
const parser = require('body-parser');
const session = require('../session');
const passport = require('passport');

const Todo = database.models.Todo;
const router = new express.Router();

router.use(parser.json());

router.use('/auth', require('./auth'));

router.get(
    '/users/me',
    session.requireActiveSession,
    function (req, res, next) {
        res.json(req.user);
    }
);


const GitHubStrategy = require('passport-github2');
passport.use(
    new GitHubStrategy({
        clientID: '67328b9371b1392ac68e',
        clientSecret: '6ba52d89ef0f4dbc72580dedc653f92c84302076',
        callbackURL: 'http://localhost:3000/api/users/signin/github/callback'
    },
    function (accessToken, refreshToken, profile, next) {
        User.findOne({ "_github_id": profile.id }, function (err, user) {
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
    })
);

router.get(
    '/users/signin/github',
    passport.authenticate('github', {scope: ['user:email']})
);

router.get(
    '/users/signin/github/callback',
    passport.authenticate('github'),
    function (req, res) {
        res.redirect('/');
    }
);

router.get(
    '/todos',
    session.requireActiveSession,
    function (req, res, next) {
        Todo.find({'_user': req.user.id}, function (err, todos) {
            if (err) {
                return next(err);
            }

            res.json(todos);
        });
    }
);

router.post(
    '/todos',
    session.requireActiveSession,
    function (req, res, next) {
        const todo = req.body;
        todo['_user'] = req.user.id;

        Todo.create(todo, function (err, todo) {
            if (err) {
                return next(err);
            }
            res.status(201).json(todo);
        });
    }
);

router.put(
    '/todos/:id',
    session.requireActiveSession,
    function (req, res, next) {
        const id = req.params.id;
        const todo = req.body;
        todo['_user'] = req.user.id;

        Todo.findOneAndUpdate(
            {
                '_user': req.user.id,
                '_id': id
            },
            todo,
            {new: true},
            function (err, todo) {
                if (err) {
                    return next(err);
                }
                if (!todo) {
                    return next(new Error("Todo doesn't exist"));
                }

                res.json(todo);
            }
        );
    }
);

router.delete(
    '/todos/:id',
    session.requireActiveSession,
    function (req, res, next) {
        Todo.findOneAndRemove(
            {
                '_user': req.user.id,
                '_id': req.params.id
            },
            function (err, todo) {
                if (err) {
                    return next(err);
                }

                if (!todo) {
                    return next(new Error(`Todo with id: '${req.params.id}'
                        doesn't exist`));
                }
                res.json(todo);
            }
        );
    }
);

router.use(function handleErrors(err, req, res, next) {
    res.status(500).json({
        title: 'Internal server error',
        message: err.message
    });
});

module.exports = router;
