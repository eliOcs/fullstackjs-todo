/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const RouterModule = require("@angular/router").RouterModule;
const TodoListComponent = require("./todo/todo-list.component");

const Router = RouterModule.forRoot([
    {
        path: "",
        component: TodoListComponent
    }
]);

module.exports = Router;
