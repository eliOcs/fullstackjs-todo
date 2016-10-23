/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const EventEmitter = require('@angular/core').EventEmitter;
const TodoService = require('./todo.service');

const TodoComponent = Component({
    selector: 'todo',
    inputs: ['todo'],
    templateUrl: 'templates/todo/todo.component.html',
    styleUrls: ['styles/todo/todo.component.css']
}).Class({
    constructor: [TodoService, function (todoService) {
        this.todoService = todoService;
        this.editing = false;
    }],

    state() {
        if (this.todo.completed) {
            return "completed";
        } else if (this.editing) {
            return "editing";
        } else {
            return "default";
        }
    },

    complete() {
        this.todoService.completeTodo(this.todo);
    },

    edit() {
        this.editing = true;
    },

    finishEdit(newTitle) {
        this.todoService.updateTodoTitle(this.todo, newTitle).then(() => {
            this.editing = false;
        });
    },

    cancelEdit() {
        this.editing = false;
    },

    delete() {
        this.todoService.deleteTodoById(this.todo.id);
    }
});

module.exports = TodoComponent;
