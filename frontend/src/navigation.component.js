/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const Router = require('@angular/router').Router;
const UserService = require('./user/user.service');

class NavigationComponent {

    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit() {
        this.userService.user.subscribe((user) => {
            this.user = user
            if (user) {
                this.router.navigate(['/todos']);
            } else {
                this.router.navigate(['/signin']);
            }
        });
    }

    signOut(event) {
        this.userService.signOut();
        event.preventDefault();
    }

}

NavigationComponent.parameters = [
    UserService, Router
];

NavigationComponent.annotations = [
    new Component({
        selector: 'navigation',
        templateUrl: 'templates/navigation.component.html',
        styleUrls: ['styles/navigation.component.css']
    })
];

module.exports = NavigationComponent;
