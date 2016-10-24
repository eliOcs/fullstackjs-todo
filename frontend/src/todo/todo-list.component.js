const Component = require("@angular/core").Component;
const TodoService = require("./todo.service");

class TodoListComponent {

    constructor(todosService) {
        this.todosService = todosService;
        this.newTodoTitle = "";
    }

    ngOnInit() {
        this.todosService.getTodos().then((todosObservable) => {
            todosObservable.subscribe((todos) => {
                this.todos = todos;
            });
        });
    }

    newTodo() {
        this.todosService.createTodo(this.newTodoTitle, false).then(() => {
            this.clearNewTodoTitle();
        });
    }

    clearNewTodoTitle() {
        this.newTodoTitle = "";
    }

}

TodoListComponent.annotations = [new Component({
    selector: "todo-list",
    templateUrl: "templates/todo/todo-list.component.html"
})];

TodoListComponent.parameters = [TodoService];

module.exports = TodoListComponent;
