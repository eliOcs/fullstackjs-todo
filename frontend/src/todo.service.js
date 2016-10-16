/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Class = require('@angular/core').Class;
const Http = require('@angular/http').Http;
const Headers = require('@angular/http').Headers;

require('rxjs/add/operator/toPromise');

const TodoService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/todos";
        this.headers = new Headers({"Content-Type": "application/json"});
    }],

    getTodos() {
        return this.http.get(this.baseUrl)
            .toPromise().then((response) => response.json())
            .catch(this.handleError);

    },

    createTodo(todo) {
        return this.http
            .post(
                this.baseUrl,
                JSON.stringify(todo),
                {headers: this.headers}
            )
            .toPromise().then((response) => response.json())
            .catch(this.handleError);
    },

    updateTodo(todo) {
        return this.http
            .put(
                `${this.baseUrl}/${todo._id}`,
                JSON.stringify(todo),
                {headers: this.headers}
            )
            .toPromise().then((response) => response.json())
            .catch(this.handleError);
    },

    deleteTodo(todo) {
        return this.http.delete(`${this.baseUrl}/${todo._id}`)
            .toPromise().then((response) => response.json())
            .catch(this.handleError);
    },

    handleError(err) {
        throw err;
    }

});

module.exports = TodoService;
