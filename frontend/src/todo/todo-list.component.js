/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const TodoService = require('./todo.service');

const TodoListComponent = Component({
    selector: 'todo-list',
    templateUrl: 'templates/todo/todo-list.component.html'
}).Class({
    constructor: [
        TodoService,
        function (todosService) {
            this.todosService = todosService;
            this.newTodoTitle = '';
        }
    ],

    ngOnInit() {
        this.todosService.getTodos().then((todosObservable) => {
            todosObservable.subscribe((todos) => {
                this.todos = todos;
            });
        });
    },

    newTodo() {
        this.todosService.createTodo(this.newTodoTitle, false).then((todo) => {
            this.clearNewTodoTitle();
        });
    },

    clearNewTodoTitle() {
        this.newTodoTitle = '';
    }

});

module.exports = TodoListComponent;
