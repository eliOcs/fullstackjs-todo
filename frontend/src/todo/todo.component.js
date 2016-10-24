const Component = require("@angular/core").Component;
const TodoService = require("./todo.service");

class TodoComponent {
    constructor(todoService) {
        this.todoService = todoService;
        this.editing = false;
    }

    state() {
        if (this.todo.completed) {
            return "completed";
        } else if (this.editing) {
            return "editing";
        } else {
            return "default";
        }
    }

    complete() {
        this.todoService.completeTodo(this.todo);
    }

    edit() {
        this.editing = true;
    }

    finishEdit(newTitle) {
        this.todoService.updateTodoTitle(this.todo, newTitle).then(() => {
            this.editing = false;
        });
    }

    cancelEdit() {
        this.editing = false;
    }

    delete() {
        this.todoService.deleteTodoById(this.todo.id);
    }
}

TodoComponent.annotations = [new Component({
    selector: "todo",
    inputs: ["todo"],
    templateUrl: "templates/todo/todo.component.html",
    styleUrls: ["styles/todo/todo.component.css"]
})];

TodoComponent.parameters = [TodoService];

module.exports = TodoComponent;
