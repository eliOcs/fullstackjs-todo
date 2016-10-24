"use strict";

const express = require("express");

const router = new express.Router();

router.use(express.static("./frontend/build"));

const sendFrontendEntry = (function () {
    const path = require("path");
    const indexHtmlPath = path.resolve("./frontend/build/index.html");

    return function (req, res) {
        res.sendFile(indexHtmlPath);
    };
})();

const frontendRoutes = (function () {
    const fs = require("fs");
    const content = fs.readFileSync("./frontend/src/app.router.js", "utf8");
    const regex = /(?:path\: \")(.*)(?:\")/g;

    let routes = [];
    let match;
    while ((match = regex.exec(content))) {
        routes.push(`/${match[1]}`);
    }
    return routes;
})();

frontendRoutes.forEach((route) => {
    router.get(route, sendFrontendEntry);
});

module.exports = router;
