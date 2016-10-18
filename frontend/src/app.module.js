/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const NgModule = require('@angular/core').NgModule;
const BrowserModule = require('@angular/platform-browser').BrowserModule;
const FormsModule = require('@angular/forms').FormsModule;
const HttpModule = require('@angular/http').HttpModule;
const CookieService = require('angular2-cookie/services/cookies.service').CookieService;

const Router = require('./app.router');
const UserService = require('./user/user.service');
const AppComponent = require('./app.component');
const LoadingComponent = require('./loading.component');
const NavigationComponent = require('./navigation.component');

const SignInComponent = require('./user/sign-in.component');
const SignUpComponent = require('./user/sign-up.component');
const ExternalAuthProvidersComponent = require('./user/external-auth-providers.component');

const TodoListComponent = require('./todo/todo-list.component');
const TodoComponent = require('./todo/todo.component');

const AppModule = NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Router
    ],
    providers: [
        UserService,
        CookieService
    ],
    declarations: [
        AppComponent,
        LoadingComponent,
        NavigationComponent,
        SignInComponent,
        SignUpComponent,
        ExternalAuthProvidersComponent,
        TodoListComponent,
        TodoComponent
    ],
    bootstrap: [AppComponent]
}).Class({
    constructor: function () {}
});

module.exports = AppModule;
