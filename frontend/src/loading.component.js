/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

class LoadingComponent {
    constructor() {}
}

LoadingComponent.annotations = [
    new Component({
        selector: 'loading',
        templateUrl: 'templates/loading.component.html'
    })
];

module.exports = LoadingComponent;
