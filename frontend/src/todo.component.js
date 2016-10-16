/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;
const ViewChild = require('@angular/core').ViewChild;


const TodoComponent = Component({
    selector: 'todo',
    templateUrl: 'templates/todo.component.html',
    styleUrls: ['styles/todo.component.css']
}).Class({
    constructor: function () {
        this.editing = false;

        this.todo = {
            title: "Lemon juice",
            completed: false
        }
    },

    state: function () {
        if (this.todo.completed) {
            return "completed";
        } else if (this.editing) {
            return "editing";
        } else {
            return "default";
        }
    },

    complete: function () {
        this.todo.completed = true;
    },

    edit: function () {
        this.editing = true;
    },

    finishEdit: function (newTitle) {
        this.todo.title = newTitle;
        this.editing = false;
    },

    cancelEdit: function () {
        this.editing = false;
    },

    delete: function () {

    }
});

module.exports = TodoComponent;
