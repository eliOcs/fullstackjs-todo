const Component = require("@angular/core").Component;

class PublicNavigationComponent { }

PublicNavigationComponent.annotations = [
    new Component({
        selector: "public-navigation",
        templateUrl: "templates/user/public-navigation.component.html",
        styleUrls: ["styles/user/public-navigation.component.css"]
    })
];

module.exports = PublicNavigationComponent;
