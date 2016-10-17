/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Class = require('@angular/core').Class;
const Http = require('@angular/http').Http;
const Headers = require('@angular/http').Headers;
const CookieService = require('angular2-cookie/services/cookies.service').CookieService;

require('rxjs/add/operator/toPromise');

const UserService = Class({

    constructor: [Http, CookieService, function (http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.baseUrl = "/api/users";
        this.headers = new Headers({"Content-Type": "application/json"});
    }],

    isSessionActive() {
        return Boolean(this.cookieService.get('todo-session'));
    },

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
