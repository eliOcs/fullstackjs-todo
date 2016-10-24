const Component = require("@angular/core").Component;
const UserService = require("./user.service");

class SignInComponent {
    constructor(userService) {
        this.userService = userService;
    }

    signIn() {
        this.userService
            .signIn(this.email, this.password)
            .then((successful) => {
                if (!successful) {
                    // TODO: error handling
                }
            });
    }
}

SignInComponent.annotations = [new Component({
    selector: "sign-in",
    templateUrl: "templates/user/sign-in.component.html",
    styleUrls: ["styles/form.component.css"]
})];

SignInComponent.parameters = [UserService];

module.exports = SignInComponent;
