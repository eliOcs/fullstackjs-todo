const Component = require("@angular/core").Component;

class ExternalAuthProvidersComponent {}

ExternalAuthProvidersComponent.annotations = [new Component({
    selector: "external-auth-providers",
    templateUrl: "templates/user/external-auth-providers.component.html",
    styleUrls: ["styles/user/external-auth-providers.component.css"]
})];

module.exports = ExternalAuthProvidersComponent;
