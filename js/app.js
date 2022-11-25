window.addEventListener('load', () => {
    const nameInput = document.querySelector('.greeting-item'),
    addTodoForm = document.querySelector('.add-form'),
    addTodoButton = document.querySelector('.add-item'),
    todoList = document.querySelector('.todo-list'),
    todoListItem = document.querySelector('.rodo-list__item');

    // Local storage name

    const userName = localStorage.getItem('userName') || '';
    nameInput.value = userName;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('userName', e.target.value);
    });

    //

    let todoDB = [];

    addTodoButton.addEventListener('click', () => {
        if (addTodoForm.value && addTodoForm.value.trim() !== '') {
            let newTodo = {
                todo: addTodoForm.value
            };
    
            todoDB.push(newTodo);
    
            addTodoForm.value = '';
            addTodoForm.focus();
            displayTodos();
    
            localStorage.setItem('todo', JSON.stringify(todoDB));
        } else {
            alert('Incorrect todo task');
            addTodoForm.value = '';
            addTodoForm.focus();
        }
    });

    // Todos localstorage

    if (localStorage.getItem('todo')) {
        todoDB = JSON.parse(localStorage.getItem('todo'));
        displayTodos();
    }

    //

    function displayTodos() {
        let displayTodos = '';

        todoDB.forEach((item) => {
            displayTodos += `
            <div class="todo-list__item">
                    <input type="text" class="todo-list__item-name" name="todo-list__item-name" value="${item.todo.trim()}"
                        readonly>
                    <div class="todo-list__item-buttons">
                        <img src="images/edit-icon.png" alt="edit icon" class="edit-todo">
                        <img src="images/delete-icon.png" alt="delete icon" class="delete-todo">
                    </div>
                </div>
            `;

            todoList.innerHTML = displayTodos;
        });
    }

    function deleteTodos(item) {
        
        if (item.target.classList.contains('delete-todo')) {
            todoDB.splice(item.target, 1);
            localStorage.setItem('todo', JSON.stringify(todoDB));
            displayTodos();
            console.log(todoDB);
        }
    }

    todoList.addEventListener('click', deleteTodos);



    // const hamb = document.querySelector('.hamburger');


    //     function makeHambMobActive() {
    //         hamb.classList.toggle('is-active');
    //     }

    //     hamb.addEventListener('click', function () {
    //         makeHambMobActive();
    //     });
});