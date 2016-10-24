const RouterModule = require("@angular/router").RouterModule;
const LoadingComponent = require("./loading.component");
const TodoListComponent = require("./todo/todo-list.component");
const SignInComponent = require("./user/sign-in.component");
const SignUpComponent = require("./user/sign-up.component");

const Router = RouterModule.forRoot([
    {
        path: "",
        component: LoadingComponent
    },
    {
        path: "todos",
        component: TodoListComponent
    },
    {
        path: "signin",
        component: SignInComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    }
]);

module.exports = Router;
