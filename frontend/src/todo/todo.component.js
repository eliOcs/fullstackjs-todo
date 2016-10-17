/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const EventEmitter = require('@angular/core').EventEmitter;
const TodoService = require('./todo.service');

const TodoComponent = Component({
    selector: 'todo',
    inputs: ['todo'],
    outputs: ['onDelete'],
    providers: [TodoService],
    templateUrl: 'templates/todo/todo.component.html',
    styleUrls: ['styles/todo/todo.component.css']
}).Class({
    constructor: [TodoService, function (todoService) {
        this.todoService = todoService;
        this.editing = false;
        this.onDelete = new EventEmitter();
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
        this.todo.completed = true;
        this.todoService.updateTodo(this.todo)
    },

    edit() {
        this.editing = true;
    },

    finishEdit(newTitle) {
        const that = this;
        that.todoService.updateTodo(that.todo).then(function () {
            that.todo.title = newTitle;
            that.editing = false;
        });
    },

    cancelEdit() {
        this.editing = false;
    },

    delete() {
        const that = this;
        that.todoService.deleteTodo(that.todo).then(function () {
            that.onDelete.emit(that.todo);
        });
    }
});

module.exports = TodoComponent;
