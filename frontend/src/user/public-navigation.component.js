/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

class PublicNavigationComponent {
    constructor() {}
}

PublicNavigationComponent.annotations = [
    new Component({
        selector: 'public-navigation',
        templateUrl: 'templates/user/public-navigation.component.html',
        styleUrls: ['styles/user/public-navigation.component.css']
    })
];

module.exports = PublicNavigationComponent;
