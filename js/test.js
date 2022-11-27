window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body'),
        userName = body.querySelector('.greeting-item'),
        addTaskForm = body.querySelector('.add-form'),
        addTaskButton = body.querySelector('.add-item'),
        taskList = document.querySelector('.todo-list');

    // Local storage user name

    const userNameLocal = localStorage.getItem('userNameLocal') || '';

    userName.value = userNameLocal;

    userName.addEventListener('change', (e) => {
        localStorage.setItem('userNameLocal', e.target.value);
    });

    // Task DB

    let todoDB = [];

    // TodoDB local storage

    if (localStorage.getItem('todo')) {
        todoDB = JSON.parse(localStorage.getItem('todo'));
        displayTasks(todoDB);
    }

    // Add task section

    addTaskButton.addEventListener('click', () => {
        let addTaskValue = addTaskForm.value;

        if (addTaskValue.trim() !== '' && checkTaskCopy(addTaskValue, todoDB)) {

            const todo = {
                content: addTaskValue.trim(),
                checked: false,
                uniqueId: Date.now()
            };

            todoDB.push(todo);
            localStorage.setItem('todo', JSON.stringify(todoDB));


            displayTasks(todoDB);
            rotateAnimationAdd();

            addTaskForm.value = '';
            addTaskForm.focus();
        } else {
            alert('You created copy or invalid element');
            addTaskForm.value = '';
            addTaskForm.focus();
        }
    });

    // Display tasks function

    function displayTasks(item) {
        let defaultTask = '';

        item.forEach((tasks) => {
            const completeTasks = tasks.checked ? 'todo-list__item-name complete' : 'todo-list__item-name'; // Переделать
            const checked = tasks.checked ? 'checked' : ''; // Переделать

            defaultTask += `
            <div class="todo-list__item" id="${tasks.uniqueId}">
                <input type="checkbox" class="todo-list__item-checkbox" ${checked}>
                <input type="text" class="${completeTasks}" name="todo-list__item-name" value="${tasks.content}" readonly>
                <div class="todo-list__item-buttons">
                    <img src="images/edit-icon.png" alt="edit icon" class="edit-todo">
                    <img src="images/delete-icon.png" alt="delete icon" class="delete-todo">
                </div>
            </div>
            `;
        });

        taskList.innerHTML = defaultTask;
    }

    // Check for task dublicate

    function checkTaskCopy(item, db) {
        let noCopy = true;

        db.forEach((todo) => {
            if (todo.content === item) {
                noCopy = false;
            }

        });

        return noCopy;
    }

    // Delete function

    function deleteTasks(id, db) {
        db.forEach((todo, item) => {
            if (todo.uniqueId == id) {
                db.splice(item, 1);
            }
        });
    }

    // Tasklist events

    taskList.addEventListener('click', event => {
        const target = event.target;
        

        if (target.classList.contains('delete-todo')) {
            const uniqueId = target.parentElement.parentElement.getAttribute('id');
            
            deleteTasks(uniqueId, todoDB);
            displayTasks(todoDB);
        }

        if (target.classList.contains('todo-list__item-checkbox')) {
            const uniqueId = target.parentElement.getAttribute('id');
            const checked = target.checked;

            changeTasksStatus(uniqueId, checked, todoDB);
            displayTasks(todoDB);
        }

        localStorage.setItem('todo', JSON.stringify(todoDB));
    });

    // Change function status
    function changeTasksStatus(id, status, db) {
        db.forEach(item => {
            if (item.uniqueId == id) {
                item.checked = status;
            }
        });
    }

    // Animation

    function rotateAnimationAdd() {
        addTaskButton.classList.add('rotate-addButton');
    }

    function rotateAnimationRemove() {
        addTaskButton.classList.remove('rotate-addButton');
    }

    addTaskButton.addEventListener("animationend", rotateAnimationRemove, false);

});