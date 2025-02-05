function getAllTodo() {
    const cookie = document.cookie.split('; ');
    const todos = cookie.find(item => item.startsWith('todos='));
    const todosValue = todos ? todos.split('=')[1] : '[]';

    return JSON.parse(todosValue);
}

function setTodo(todos) {
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/; max-age=86400";
}

function loadTodo() {
    const list = document.getElementById("ft_list");
    list.innerHTML = "";
    getAllTodo().reverse().forEach(
        todo => createTodo(todo, false)
    );
}

function createTodo(text, save = true) {
    const todo = document.createElement("div");

    todo.className = "todo";
    todo.innerText = text;

    todo.onclick = function () {
        if (confirm("Do you want to remove task: " + text)) {
            todo.remove();
            const todos = getAllTodo().filter(t => t !== text);
            setTodo(todos);
        }
    };
    document.getElementById("ft_list").prepend(todo);

    if (save) {
        const todos = getAllTodo();
        todos.unshift(text);
        setTodo(todos);
    }
}

function addTodo() {
    const text = prompt("Enter a new TO DO:");
    if (text) {
        createTodo(text);
    }
}

window.onload = loadTodo;