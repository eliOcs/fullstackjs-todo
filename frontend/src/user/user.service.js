/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Class = require('@angular/core').Class;
const Http = require('@angular/http').Http;
const Headers = require('@angular/http').Headers;
const CookieService = require('angular2-cookie/services/cookies.service').CookieService;

require('rxjs/add/operator/toPromise');
const Subject = require('rxjs').Subject;

const UserService = Class({

    constructor: [Http, CookieService, function (http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new Headers({"Content-Type": "application/json"});
        this.user = new Subject();
        this.getUser().then((user) => {
            this.user.next(user)
        });
    }],

    getUser() {
        return this.http
            .get('/api/users/me')
            .toPromise().then(
                (response) => response.json(),
                (response) => response.status === 401 ? null : Promise.reject(response)
            ).catch(this.handleError);
    },

    signIn(email, password) {
        return this.http
            .post(
                '/api/auth/local/signin',
                JSON.stringify({email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                (response) => {
                    this.user.next(response.json());
                    return true;
                },
                (response) => response.status === 401 ? false : Promise.reject(response)
            ).catch(this.handleError);
    },

    signUp(name, email, password) {
        return this.http
            .post(
                '/api/auth/local/signup',
                JSON.stringify({name, email, password}),
                {headers: this.headers}
            )
            .toPromise().then(
                (response) => {
                    this.user.next(response.json());
                    return true;
                },
                (response) => response.status === 401 ? false : Promise.reject(response)
            ).catch(this.handleError);
    },

    signOut() {
        return this.http
            .post('/api/auth/signout')
            .toPromise()
            .then(() => this.user.next(null));
    },

    handleError(err) {
        throw err;
    }

});

module.exports = UserService;
