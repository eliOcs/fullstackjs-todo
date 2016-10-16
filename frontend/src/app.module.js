/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const NgModule = require('@angular/core').NgModule;
const BrowserModule = require('@angular/platform-browser').BrowserModule;
const FormsModule = require('@angular/forms').FormsModule;
const HttpModule = require('@angular/http').HttpModule;

const AppComponent = require('./app.component');
const TodoListComponent = require('./todo-list.component');
const TodoComponent = require('./todo.component');

const AppModule = NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
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
