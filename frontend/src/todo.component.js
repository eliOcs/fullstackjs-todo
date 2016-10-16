/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

const TodoComponent = Component({
    selector: 'todo',
    inputs: ['todo'],
    templateUrl: 'templates/todo.component.html',
    styleUrls: ['styles/todo.component.css']
}).Class({
    constructor: function () {
        this.editing = false;
    },

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
    },

    edit() {
        this.editing = true;
    },

    finishEdit(newTitle) {
        this.todo.title = newTitle;
        this.editing = false;
    },

    cancelEdit() {
        this.editing = false;
    },

    delete() {

    }
});

module.exports = TodoComponent;
