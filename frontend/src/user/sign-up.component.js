/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user.service');

const SignUpComponent = Component({
    selector: 'sign-up',
    templateUrl: 'templates/user/sign-up.component.html',
    styleUrls: ['styles/form.component.css']
}).Class({

    constructor: [UserService, function (userService) {
        this.userService = userService;
    }],

    signUp: function () {
        const router = this.router;

        this.userService
            .signUp(this.name, this.email, this.password)
            .then(function () {

            });
    }

});

module.exports = SignUpComponent;
