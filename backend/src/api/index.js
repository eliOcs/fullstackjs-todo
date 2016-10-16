/*jslint node, es6, maxlen: 80*/
'use strict';

const express = require('express');
const database = require('../database');
const parser = require('body-parser');

const Todo = database.models.Todo;
const router = new express.Router();

router.use(parser.json());


router.get('/todos', function (req, res, next) {
    Todo.find({}, function (err, todos) {
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
});

router.post('/todos', function (req, res, next) {
    const todo = req.body;

    Todo.create(todo, function (err, todo) {
        if (err) {
            return next(err);
        }
        res.status(201).json(todo);
    });
});

router.put('/todos/:id', function (req, res, next) {
    const id = req.params.id;
    const todo = req.body;

    Todo.findByIdAndUpdate(id, todo, {new: true}, function (err, todo) {
        if (err) {
            return next(err);
        }

        res.json(todo);
    });
});

router.delete('/todos/:id', function (req, res, next) {
    const id = req.params.id;
    Todo.findByIdAndRemove(id, function (err, todo) {
        if (err) {
            return next(err);
        }

        if (!todo) {
            return next(new Error(`Todo with id: '${id}' doesn't exist`));
        }
        res.json(todo);
    });
});

router.use(function handleErrors(err, req, res, next) {
    res.status(500).json({
        title: "Internal server error",
        message: err.message
    });
});

module.exports = router;
