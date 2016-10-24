const Component = require("@angular/core").Component;
const UserService = require("./user.service");

class SignUpComponent {

    constructor(userService) {
        this.userService = userService;
    }

    signUp() {
        this.userService
            .signUp(this.name, this.email, this.password)
            .then(function () {
                // TODO: error handling
            });
    }

}

SignUpComponent.annotations = [new Component({
    selector: "sign-up",
    templateUrl: "templates/user/sign-up.component.html",
    styleUrls: ["styles/form.component.css"]
})];

SignUpComponent.parameters = [UserService];

module.exports = SignUpComponent;
