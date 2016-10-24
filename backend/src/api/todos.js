"use strict";

const express = require("express");
const session = require("../session");
const database = require("../database");
const Todo = database.models.Todo;

const router = new express.Router();

router.get(
    "/",
    session.requireActiveSession,
    function (req, res, next) {
        Todo.find({"_user": req.user.id}, function (err, todos) {
            if (err) {
                return next(err);
            }

            res.json(todos);
        });
    }
);

router.post(
    "/",
    session.requireActiveSession,
    function (req, res, next) {
        const todo = new Todo(req.body);
        todo.set("_user", req.user.id);

        todo.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(201).json(todo);
        });
    }
);

router.put(
    "/:id",
    session.requireActiveSession,
    function (req, res, next) {
        Todo.findOneAndUpdate(
            {
                "_user": req.user.id,
                "_id": req.params.id
            },
            {
                title: req.body.title,
                completed: req.body.completed
            },
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
    "/:id",
    session.requireActiveSession,
    function (req, res, next) {
        Todo.findOneAndRemove(
            {
                "_user": req.user.id,
                "_id": req.params.id
            },
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

module.exports = router;
