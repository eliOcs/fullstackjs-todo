const assert = require("assert");
const request = require("request");

describe("Local Auth", function () {
    describe("Sign in", function () {
        it("should return error if no email is provided", function (next) {
            request.post(
                "http://localhost:3000/api/auth/local/signin",
                function (err, res, body) {
                    assert.ifError(err);
                    assert.equal(res.statusCode, 400);
                    assert.equal(body, "Bad Request");
                    next();
                }
            );
        });
    });
});
