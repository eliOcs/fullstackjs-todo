const Component = require("@angular/core").Component;
const Router = require("@angular/router").Router;
const UserService = require("../user/user.service");

class TodoNavigationComponent {

    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit() {
        this.userService.getUser().then((userObservable) => {
            userObservable.subscribe((user) => {
                if (user) {
                    this.username = user.name;
                } else {
                    this.username = null;
                }
            });
        });
    }

    signOut() {
        this.userService.signOut();
    }

}

TodoNavigationComponent.parameters = [
    UserService,
    Router
];

TodoNavigationComponent.annotations = [
    new Component({
        selector: "todo-navigation",
        templateUrl: "templates/todo/todo-navigation.component.html"
    })
];

module.exports = TodoNavigationComponent;
