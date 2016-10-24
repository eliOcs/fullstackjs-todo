const mongoose = require("mongoose");
const util = require("./util");

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
        type: String
    },
    "_github_id": String
});
UserSchema.set("toJSON", {virtuals: true, transform: util.removePrivateKeys});
module.exports = mongoose.model("User", UserSchema);
