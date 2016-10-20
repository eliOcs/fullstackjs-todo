/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

const ExternalAuthProvidersComponent = Component({
    selector: 'external-auth-providers',
    templateUrl: 'templates/user/external-auth-providers.component.html',
    styleUrls: ['styles/user/external-auth-providers.component.css']
}).Class({
    constructor: function () {}
});

module.exports = ExternalAuthProvidersComponent;
