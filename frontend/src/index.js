document.addEventListener("DOMContentLoaded", function () {

    const platform = require("@angular/platform-browser-dynamic")
        .platformBrowserDynamic();
    const AppModule = require("./app.module");

    platform.bootstrapModule(AppModule);

});
