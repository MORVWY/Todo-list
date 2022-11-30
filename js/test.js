window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body'),
        userName = body.querySelector('.greeting-item'),
        addTaskForm = body.querySelector('.add-form'),
        addTaskButton = body.querySelector('.add-item'),
        taskList = body.querySelector('.todo-list'),
        addCategoryButton = body.querySelector('.category-add__item'),
        addCategoryForm = body.querySelector('.category-add__name'),
        categoryList = body.querySelector('.category-list'),
        categoryListItem = body.querySelector('.category-list__item'),
        todoTitleItem = body.querySelector('.todo-title__item');

    // Local storage user name

    const userNameLocal = localStorage.getItem('userNameLocal') || '';

    userName.value = userNameLocal;

    userName.addEventListener('change', (e) => {
        localStorage.setItem('userNameLocal', e.target.value);
    });

    // Task DB

    let categoryDB = [{
        content: 'All todo',
        uniqueId: 17
    }];

    displayCategories(categoryDB);

    let todoDB = [];

    // TodoDB local storage

    if (localStorage.getItem('todo')) {
        todoDB = JSON.parse(localStorage.getItem('todo'));
        displayTasks(todoDB);
    }

    // CategoryDB local storage

    if (localStorage.getItem('category')) {
        categoryDB = JSON.parse(localStorage.getItem('category'));
        displayCategories(categoryDB);
    }

    // Add task section

    addTaskButton.addEventListener('click', () => {
        let addTaskValue = addTaskForm.value;

        if (addTaskValue.trim() == '') {
            alert('Empty task');
            addTaskForm.value = '';
            addTaskForm.focus();
        } else if (!checkTaskCopy(addTaskValue, todoDB)) {
            alert('Copy task');
            addTaskForm.value = '';
            addTaskForm.focus();
        } else {

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
        }
    });

    // Add category section

    addCategoryButton.addEventListener('click', () => {
        let addCategoryValue = addCategoryForm.value;

        if (addCategoryValue.trim() !== '') {

            const category = {
                content: addCategoryValue.trim(),
                // checked: false,
                uniqueId: Date.now()
            };

            categoryDB.push(category);
            localStorage.setItem('category', JSON.stringify(categoryDB));

            displayCategories(categoryDB);

            addCategoryForm.value = '';
            addCategoryForm.focus();
        } else {
            alert('Empty category');
            addCategoryForm.value = '';
            addCategoryForm.focus();
        }
    });

    // Display categories function

    function displayCategories(item) {
        let defaultCategory = '';

        item.forEach((categories) => {
            if (categories.uniqueId == 17) {
                defaultCategory += `
                <div class="category-list__item" id="${categories.uniqueId}">
                        <label>
                            <input type="radio" name="category-list__item-name" class="category-list__item-name">
                            <div class="category-list__item-nameButton">
                                <div></div>
                            </div>
                        </label><input type="text" class="category-list__item-name" name="category-list__item-name"
                            value="${categories.content}" readonly>
                    </div>
                `;
            } else {
                defaultCategory += `
            <div class="category-list__item" id="${categories.uniqueId}">
                    <label>
                        <input type="radio" name="category-list__item-name" class="category-list__item-name">
                        <div class="category-list__item-nameButton">
                            <div></div>
                        </div>
                    </label><input type="text" class="category-list__item-name" name="category-list__item-name"
                        value="${categories.content}" readonly>
                    <div class="category-list__item-buttons">
                        <img src="images/edit-icon.png" alt="edit icon" class="edit">
                        <img src="images/delete-icon.png" alt="delete icon" class="delete">
                    </div>
                </div>
            `;
            }
        });

        categoryList.innerHTML = defaultCategory;
    }


    // Display tasks function

    function displayTasks(item) {
        let defaultTask = '';

        item.forEach((tasks) => {
            const completeTasks = tasks.checked ? 'todo-list__item-name complete' : 'todo-list__item-name'; // Переделать
            const checked = tasks.checked ? 'checked' : ''; // Переделать

            defaultTask += `
            <div class="todo-list__item" id="${tasks.uniqueId}"><label><input type="checkbox" class="todo-list__item-checkbox" ${checked}><div><img src="images/checked.png"></div></label><input type="text" class="${completeTasks}" name="todo-list__item-name" value="${tasks.content}" readonly>
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
            const uniqueId = target.parentElement.parentElement.getAttribute('id');
            const checked = target.checked;

            changeTasksStatus(uniqueId, checked, todoDB);
            displayTasks(todoDB);
        }

        if (target.classList.contains('edit-todo')) {
            const uniqueId = target.parentElement.parentElement.getAttribute('id');
            const editInput = target.parentElement.parentElement.firstChild.nextSibling;

            editTasks(uniqueId, todoDB, editInput);
        }

        localStorage.setItem('todo', JSON.stringify(todoDB));
    });

    // CategoryList events

    categoryList.addEventListener('click', event => {
        const target = event.target;

        if (document.querySelector('.category-list__item label input').checked == true) {
            todoTitleItem.value = target.parentElement.nextSibling.value;
            displayCategories(categoryDB);
        }
    });

    // Category functions

    function displayCurrentCategory(item) {
        item.forEach((cat) => {

        });
    }

    // Edit tasks function

    function editTasks(id, db, input) {
        db.forEach((todo) => {
            if (todo.uniqueId == id) {
                input.removeAttribute('readonly');
                input.focus();

                input.addEventListener('blur', event => {
                    input.setAttribute('readonly', true);

                    todo.content = event.target.value;

                    localStorage.setItem('todo', JSON.stringify(todoDB));

                    displayTasks(todoDB);
                });
            }
        });
    }

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