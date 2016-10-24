"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const util = require("./util");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    "_user": {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
TodoSchema.set("toJSON", {virtuals: true, transform: util.removePrivateKeys});
module.exports = mongoose.model("Todo", TodoSchema);
