var todos = [];

const filters = {
    searchText: "",
    hideCompleted: false,
};

const findTodos = localStorage.getItem('todos');

if (findTodos != null) {
    todos = JSON.parse(findTodos);
}

const renderTodos = function(todosText, filterText) {
    const filteredTodos = todosText.filter(function(todo) {
        const searchMatch = todo.text.toLowerCase().inludes(filterText.searchText.toLowerCase());
        consthideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchMatch && hideCompletedMatch;
    });
    var incompletedTodos = filteredTodos.filter(function(todo) {
        return !todo.completed;
    });

    document.querySelector('#todos').innerHTML = 'h1';

    var summary = document.createElement('h2');
    summary.textContent = 'You have ${incompletedTodos.length} todos left';
    document.querySelector('#todos').appendChild(summary);

    filteredTodos.forEach(function(todo, index) {
        const paragraph = document.createElement('p');
        paragraph.textContent = '${index+1}.${todo.text}';
        document.querySelector('#todos').appendChild(paragraph);
    });
};

renderTodos(todos, filters);

//search todos
document.querySelector('#search-text').addEventListener('input', function(event) {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
});

// add todo
document.querySelector('#new-todo').addEventListener('submit', function(event) {
    event.preventDefault();
    if (event.target.elements.todotext.value.trim() == '') {
        return;
    }
    todos.push({
        text: event.target.elements.todotext.value,
        completed: false,
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos, filters);
    event.target.elements.todotext.value == '';
});

//hide completed todos
document.querySelector('#hide-completed').addEventListener('change', function(event) {
    filters.hideCompleted = event.target.checked;
    renderTodos(todos, filters);
});