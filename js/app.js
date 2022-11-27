window.addEventListener('load', () => {
    const nameInput = document.querySelector('.greeting-item'),
        addTaskForm = document.querySelector('.add-form'),
        addTaskButton = document.querySelector('.add-item'),
        taskList = document.querySelector('.todo-list');

    // Local storage name

    const userName = localStorage.getItem('userName') || '';
    nameInput.value = userName;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('userName', e.target.value);
    });

    // Task DB

    let tasks = [];

    if(localStorage.getItem('todo')) {
        tasks = JSON.parse(localStorage.getItem('todo')); 
        tasksRender(tasks);
    }

    // Add task on click

    addTaskButton.addEventListener('click', () => {
        let taskFormValue = addTaskForm.value;

        if (taskFormValue && taskCopyCheck(taskFormValue, tasks) && taskFormValue.trim() !== '') {
            addTask(taskFormValue.trim(), tasks);
            addTaskForm.value = '';
            addTaskForm.focus();
            tasksRender(tasks);
        } else {
            alert('Enter valid task');
            addTaskForm.value = '';
            addTaskForm.focus();
        }

        localStorage.setItem('todo', JSON.stringify(tasks));
    });    

    // Add task function

    function addTask(text, list) {
        const timeStamp = Date.now();
        const task = {
            id: timeStamp,
            category: '',
            text,
            isComplete: false
        };

        list.push(task);
    }

    // Check for task dublicate
    function taskCopyCheck(text, list) {
        let isNotHave = true;

        list.forEach((task) => {
            if (task.text === text) {
                alert('Task is already added');
                isNotHave = false;
            }

        });

        return isNotHave;
    }

    // Show task function

    function tasksRender(list) {
        let defaultTask = '';

        list.forEach((task) => {
            const cls = task.isComplete ? 'todo-list__item-name complete' : 'todo-list__item-name';
            const checked = task.isComplete ? 'checked' : '';

            defaultTask += `
            <div class="todo-list__item" id="${task.id}">
                <input type="checkbox" ${checked} class="todo-list__item-checkbox">
                <input type="text" class="${cls}" name="todo-list__item-name" value="${task.text}" readonly>
                <div class="todo-list__item-buttons">
                    <img src="images/edit-icon.png" alt="edit icon" class="edit-todo">
                    <img src="images/delete-icon.png" alt="delete icon" class="delete-todo">
                </div>
            </div>
            `;

            taskList.innerHTML = defaultTask;
        });
    }

    taskList.addEventListener('click', event => {
        const target = event.target;
        const isComplete = target.checked;
        if (target.classList.contains('todo-list__item-checkbox')) {
            const taskId = target.parentElement.getAttribute('id');
            changeTaskStatus(taskId, isComplete, tasks);
            tasksRender(tasks);
        }

        if (target.classList.contains('delete-todo')) {
            const taskId = target.parentElement.parentElement.getAttribute('id');
            deleteTask(taskId, tasks);
            tasksRender(tasks);
        }

        localStorage.setItem('todo', JSON.stringify(tasks));
    });

    function changeTaskStatus(id, status, list) {
        list.forEach(task => {
            if (task.id == id) {
                task.isComplete = status;
            }
        });
    }

    function deleteTask(id, list) {
        list.forEach((task, idx) => {
            if (task.id == id) {
                list.splice(idx, 1);
            }
        });
    }

    // const hamb = document.querySelector('.hamburger');


    //     function makeHambMobActive() {
    //         hamb.classList.toggle('is-active');
    //     }

    //     hamb.addEventListener('click', function () {
    //         makeHambMobActive();
    //     });
});