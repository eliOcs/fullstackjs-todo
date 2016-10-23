/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const UserService = require('./user/user.service');
const Router = require('@angular/router').Router;

const AppComponent = Component({
    selector: 'app',
    templateUrl: 'templates/app.component.html',
    styleUrls: ['styles/app.component.css']
}).Class({

    constructor: [UserService, Router, function (userService, router) {
        this.userService = userService;
        this.router = router;
    }],

    ngOnInit: function () {
        this.userService.getUser().then((userObservable) => {
            userObservable.subscribe((user) => {
                const route = user ? '/todos' : '/signin';
                this.router.navigate([route], {replaceUrl: true});
            });
        });
    }

});

module.exports = AppComponent;
