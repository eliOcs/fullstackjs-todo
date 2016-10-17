/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Class = require('@angular/core').Class;
const Http = require('@angular/http').Http;
const Headers = require('@angular/http').Headers;

require('rxjs/add/operator/toPromise');

const UserService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/users";
        this.headers = new Headers({"Content-Type": "application/json"});
    }],

    signIn(email, password) {
        return this.http
            .post(
                `${this.baseUrl}/signin`,
                JSON.stringify({email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                () => true,
                (response) => response.status === 401 ? false : Promise.reject(response)
            ).catch(this.handleError);
    },

    signUp(name, email, password) {
        return this.http
            .post(
                `${this.baseUrl}/signup`,
                JSON.stringify({name, email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                () => true,
                (response) => response.status === 401 ? false : Promise.reject(response)
            ).catch(this.handleError);
    },

    handleError(err) {
        throw err;
    }

});

module.exports = UserService;
