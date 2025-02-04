function getTodos() {
    return JSON.parse(document.cookie.split('; ').find(row => row.startsWith('todos='))?.split('=')[1] || '[]');
}

function setTodos(todos) {
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function renderTodos() {
    const list = document.getElementById("ft_list");
    list.innerHTML = "";
    getTodos().reverse().forEach(todo => createTodoElement(todo, false));
}

function createTodoElement(text, save = true) {
    const todo = document.createElement("div");
    todo.className = "todo";
    todo.innerText = text;
    todo.onclick = function () {
        if (confirm("Do you want to remove this task?")) {
            todo.remove();
            const todos = getTodos().filter(t => t !== text);
            setTodos(todos);
        }
    };
    document.getElementById("ft_list").prepend(todo);

    if (save) {
        const todos = getTodos();
        todos.unshift(text);
        setTodos(todos);
    }
}

function addTodo() {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim()) {
        createTodoElement(text.trim());
    }
}

window.onload = renderTodos;