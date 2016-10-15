/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const NgModule = require('@angular/core').NgModule;
const BrowserModule = require('@angular/platform-browser').BrowserModule;
const AppComponent = require('./app.component');

const AppModule = NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
}).Class({
    constructor: function () {}
});

module.exports = AppModule;
