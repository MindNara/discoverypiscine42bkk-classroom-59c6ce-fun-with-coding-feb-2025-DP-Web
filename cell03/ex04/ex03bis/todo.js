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
    const $list = $("#ft_list");
    $list.empty();
    getAllTodo().reverse().forEach(todo => createTodo(todo, false));
}

function createTodo(text, save = true) {
    const $todo = $("<div></div>")
        .addClass("todo")
        .text(text)
        .on("click", function () {
            if (confirm("Do you want to remove task: " + text)) {
                $(this).remove();
                const todos = getAllTodo().filter(t => t !== text);
                setTodo(todos);
            }
        });

    $("#ft_list").prepend($todo);

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

$(document).ready(loadTodo);