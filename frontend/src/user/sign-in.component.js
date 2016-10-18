/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user.service');
const Router = require('@angular/router').Router;

const SignInComponent = Component({
    selector: 'sign-in',
    providers: [UserService],
    templateUrl: 'templates/user/sign-in.component.html'
}).Class({
    constructor: [UserService, Router, function (userService, router) {
        this.userService = userService;
        this.router = router;
    }],

    signIn: function () {
        const that = this;
        this.userService
            .signIn(that.email, that.password)
            .then(function (succesful) {
                if (succesful) {
                    that.router.navigate(['']);
                } else {
                    console.log("FAILED TO LOG!");
                }
            });
    }
});

module.exports = SignInComponent;
