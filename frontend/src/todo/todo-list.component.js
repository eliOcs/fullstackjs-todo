/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const TodoService = require('./todo.service');
const UserService = require('../user/user.service');
const Router = require('@angular/router').Router;

const TodoListComponent = Component({
    selector: 'todo-list',
    templateUrl: 'templates/todo/todo-list.component.html',
    providers: [TodoService, UserService]
}).Class({
    constructor: [
        TodoService,
        UserService,
        Router,
        function (todosService, userService, router) {
            this.todosService = todosService;
            this.newTodoTitle = '';
            this.todos = [];

            if (!userService.isSessionActive()) {
                router.navigate(['/signin']);
            }
        }
    ],

    ngOnInit() {
        this.todosService.getTodos().then((todos) => this.todos = todos);
    },

    newTodo() {
        const todo = {
            title: this.newTodoTitle,
            completed: false
        };
        const that = this;
        that.todosService.createTodo(todo).then(function (todo) {
            that.todos.push(todo);
            that.clearNewTodoTitle();
        });
    },

    clearNewTodoTitle() {
        this.newTodoTitle = '';
    },

    onDelete(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }

});

module.exports = TodoListComponent;
