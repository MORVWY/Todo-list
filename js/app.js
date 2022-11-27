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

    const tasks = [];

    // Add task on click

    addTaskButton.addEventListener('click', () => {
        let taskFormValue = addTaskForm.value;

        if (taskFormValue && taskCopyCheck(taskFormValue, tasks)) {
            addTask(taskFormValue.trim(), tasks);
            addTaskForm.value = '';
            addTaskForm.focus();
            tasksRender(tasks);
        } else {
            alert('Enter valid task');
            addTaskForm.value = '';
            addTaskForm.focus();
        }
    });

    // Add task function

    function addTask(text, list) {
        const timeStamp = Date.now();
        const task = {
            id: timeStamp,
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
            defaultTask += `
            <div class="todo-list__item" id="${task.id}">
            <input type="checkbox">
                                <input type="text" class="todo-list__item-name" name="todo-list__item-name" value="${task.text}"
                        readonly>
                    <div class="todo-list__item-buttons">
                        <img src="images/edit-icon.png" alt="edit icon" class="edit-todo">
                        <img src="images/delete-icon.png" alt="delete icon" class="delete-todo">
                    </div>
                </div>
            `;

            taskList.innerHTML = defaultTask;
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