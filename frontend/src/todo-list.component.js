/*jslint browser, es6, maxlen: 80*/
/*global require, module */

const Component = require('@angular/core').Component;

const TodoListComponent = Component({
    selector: 'todo-list',
    templateUrl: 'templates/todo-list.component.html'
}).Class({
    constructor: function () {
        this.newTodoTitle = '';

        this.todos = [
            {
                title: 'lemon juice',
                completed: true
            },
            {
                title: 'you are great',
                completed: false
            },
            {
                title: 'welcome to the jungle',
                completed: true
            }
        ];
    },

    newTodo() {
        this.todos.push({
            title: this.newTodoTitle,
            completed: false
        });

        this.clearNewTodoTitle();
    },

    clearNewTodoTitle() {
        this.newTodoTitle = '';
    }

});

module.exports = TodoListComponent;
