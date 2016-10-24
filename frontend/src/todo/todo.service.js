const Http = require("@angular/http").Http;
const Headers = require("@angular/http").Headers;

require("rxjs/add/operator/toPromise");
const BehaviorSubject = require("rxjs").BehaviorSubject;

class TodoService {
    constructor(http) {
        this.http = http;
        this.baseUrl = "/api/todos";
        this.headers = new Headers({"Content-Type": "application/json"});
    }

    getTodos() {
        if (this.todos) {
            return Promise.resolve(this.todos);
        }

        return this.http
            .get(this.baseUrl)
            .toPromise().then(
                (response) => {
                    this.todos = new BehaviorSubject(response.json());
                    return this.todos;
                },
                () => {
                    return new Error("Couldn't get todos");
                }
            ).catch(this.handleError);
    }

    createTodo(title, completed) {
        return this.http
            .post(
                this.baseUrl,
                JSON.stringify({title, completed}),
                {headers: this.headers}
            ).toPromise().then(
                (response) => {
                    const todos = this.todos.getValue();
                    const todo = response.json();
                    this.todos.next(todos.concat(todo));
                },
                () => {
                    return new Error("Couldn't create todo");
                }
            ).catch(this.handleError);
    }

    completeTodo(todo) {
        const updatedTodo = JSON.parse(JSON.stringify(todo));
        updatedTodo.completed = true;
        return this.updateTodo(updatedTodo);
    }

    updateTodoTitle(todo, newTitle) {
        const updatedTodo = JSON.parse(JSON.stringify(todo));
        updatedTodo.title = newTitle;
        return this.updateTodo(updatedTodo);
    }

    updateTodo(updatedTodo) {
        return this.http
            .put(
                `${this.baseUrl}/${updatedTodo.id}`,
                JSON.stringify(updatedTodo),
                {headers: this.headers}
            )
            .toPromise()
            .then(
                (response) => {
                    const todos = this.todos.getValue();
                    const oldTodoIndex = todos
                        .findIndex((todo) => todo.id === updatedTodo.id);
                    const newTodo = response.json();
                    todos[oldTodoIndex] = newTodo;
                    this.todos.next(todos);
                },
                () => {
                    return new Error(`Couldn"t update todo: ${updatedTodo.id}`);
                }
            )
            .catch(this.handleError);
    }

    deleteTodoById(id) {
        return this.http
            .delete(`${this.baseUrl}/${id}`)
            .toPromise().then(
                () => {
                    const oldTodos = this.todos.getValue();
                    const newTodos = oldTodos.filter((todo) => todo.id !== id);
                    this.todos.next(newTodos);
                },
                () => {
                    return new Error(`Couldn't create todo: ${id}`);
                }
            ).catch(this.handleError);
    }

    handleError(err) {
        console.error(err);
    }

}

TodoService.parameters = [Http];

module.exports = TodoService;
