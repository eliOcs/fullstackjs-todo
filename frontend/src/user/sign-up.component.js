/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user.service');
const Router = require('@angular/router').Router;

const SignUpComponent = Component({
    selector: 'sign-up',
    providers: [UserService],
    templateUrl: 'templates/user/sign-up.component.html'
}).Class({

    constructor: [UserService, Router, function (userService, router) {
        this.userService = userService;
        this.router = router;
    }],

    signUp: function () {
        const router = this.router;

        this.userService
            .signUp(this.name, this.email, this.password)
            .then(function () {
                router.navigate(['']);
            });
    }

});

module.exports = SignUpComponent;
