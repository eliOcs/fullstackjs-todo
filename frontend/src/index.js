/*jslint browser, es6, maxlen: 80*/
/*global require */

document.addEventListener('DOMContentLoaded', function () {

    const platform = require('@angular/platform-browser-dynamic')
        .platformBrowserDynamic();
    const AppModule = require('./app.module');

    platform.bootstrapModule(AppModule);

});
