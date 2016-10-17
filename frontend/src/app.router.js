/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const RouterModule = require('@angular/router').RouterModule;
const TodoListComponent = require('./todo/todo-list.component');
const SignInComponent = require('./account/sign-in.component');
const SignUpComponent = require('./account/sign-up.component');

const Router = RouterModule.forRoot([
    {
        path: '',
        component: TodoListComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
]);

module.exports = Router;
