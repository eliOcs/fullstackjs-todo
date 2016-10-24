const Component = require("@angular/core").Component;
const UserService = require("./user/user.service");
const Router = require("@angular/router").Router;

class AppComponent {

    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }

    ngOnInit() {
        this.userService.getUser().then((userObservable) => {
            userObservable.subscribe((user) => {
                const route = user ? "/todos" : "/signin";
                this.router.navigate([route], {replaceUrl: true});
            });
        });
    }

}

AppComponent.annotations = [
    new Component({
        selector: "app",
        templateUrl: "templates/app.component.html",
        styleUrls: ["styles/app.component.css"]
    })
];

AppComponent.parameters = [UserService, Router];

module.exports = AppComponent;
