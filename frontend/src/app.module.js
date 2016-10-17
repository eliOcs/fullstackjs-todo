/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const NgModule = require('@angular/core').NgModule;
const BrowserModule = require('@angular/platform-browser').BrowserModule;
const FormsModule = require('@angular/forms').FormsModule;
const HttpModule = require('@angular/http').HttpModule;

const Router = require('./app.router');
const AppComponent = require('./app.component');
const TodoListComponent = require('./todo/todo-list.component');
const TodoComponent = require('./todo/todo.component');

const AppModule = NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Router
    ],
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoComponent
    ],
    bootstrap: [AppComponent]
}).Class({
    constructor: function () {}
});

module.exports = AppModule;
