/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

const TodoComponent = Component({
    selector: 'todo',
    templateUrl: 'templates/todo.component.html',
    styleUrls: ['styles/todo.component.css']
}).Class({
    constructor: function () {
        this.editing = false;

        this.todo = {
            name: "Lemon juice",
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

    finishEdit: function () {
        this.editing = false;
    },

    delete: function () {

    }
});

module.exports = TodoComponent;
