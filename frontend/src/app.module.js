const NgModule = require("@angular/core").NgModule;
const BrowserModule = require("@angular/platform-browser").BrowserModule;
const FormsModule = require("@angular/forms").FormsModule;
const HttpModule = require("@angular/http").HttpModule;

const Router = require("./app.router");
const UserService = require("./user/user.service");
const TodoService = require("./todo/todo.service");
const AppComponent = require("./app.component");
const LoadingComponent = require("./loading.component");

const PublicNavigationComponent = require("./user/public-navigation.component");
const SignInComponent = require("./user/sign-in.component");
const SignUpComponent = require("./user/sign-up.component");
const ExternalAuthProvidersComponent =
    require("./user/external-auth-providers.component");

const TodoListComponent = require("./todo/todo-list.component");
const TodoNavigationComponent = require("./todo/todo-navigation.component");
const TodoComponent = require("./todo/todo.component");

class AppModule {}

AppModule.annotations = [new NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Router
    ],
    providers: [
        UserService,
        TodoService
    ],
    declarations: [
        AppComponent,
        LoadingComponent,
        PublicNavigationComponent,
        SignInComponent,
        SignUpComponent,
        ExternalAuthProvidersComponent,
        TodoNavigationComponent,
        TodoListComponent,
        TodoComponent
    ],
    bootstrap: [AppComponent]
})];

module.exports = AppModule;
