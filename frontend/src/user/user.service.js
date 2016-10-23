/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Class = require('@angular/core').Class;
const Http = require('@angular/http').Http;
const Headers = require('@angular/http').Headers;

require('rxjs/add/operator/toPromise');
const BehaviorSubject = require('rxjs').BehaviorSubject;

const UserService = Class({

    constructor: [Http, function (http) {
        this.http = http;
        this.headers = new Headers({"Content-Type": "application/json"});
    }],

    getUser() {
        if (this.user) {
            return Promise.resolve(this.user);
        }

        return this.http
            .get('/api/users/me')
            .toPromise().then(
                (response) => {
                    this.user = new BehaviorSubject(response.json());
                    return this.user;
                },
                (response) => {
                    if (response.status === 401) {
                        this.user = new BehaviorSubject(null);
                        return Promise.resolve(this.user);
                    } else {
                        return new Error("Couldn't get user");
                    }
                }
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
                (response) => {
                    if (response.status === 401) {
                        false
                    }

                    throw new Error('Unexpected error');
                }
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
        console.error(err.message);
    }

});

module.exports = UserService;
