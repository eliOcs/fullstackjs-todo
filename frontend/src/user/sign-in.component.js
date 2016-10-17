/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user.service');

const SignInComponent = Component({
    selector: 'sign-in',
    providers: [UserService],
    templateUrl: 'templates/user/sign-in.component.html'
}).Class({
    constructor: [UserService, function (userService) {
        this.userService = userService;
    }],

    signIn: function () {
        const that = this;
        this.userService
            .signIn(this.email, this.password)
            .then(function (response) {
                if (response) {
                    console.log("LOGGED!");
                } else {
                    console.log("FAILED TO LOG!");
                }
            });
    }
});

module.exports = SignInComponent;
