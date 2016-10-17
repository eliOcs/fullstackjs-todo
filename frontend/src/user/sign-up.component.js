/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user.service');

const SignUpComponent = Component({
    selector: 'sign-up',
    providers: [UserService],
    templateUrl: 'templates/user/sign-up.component.html'
}).Class({

    constructor: [UserService, function (userService) {
        this.userService = userService;
    }],

    signUp: function () {
        this.userService.signUp(this.name, this.email, this.password);
    }

});

module.exports = SignUpComponent;
