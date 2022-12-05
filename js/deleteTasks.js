import {todoDB} from './app.js';
import {successAlert, displayTasks} from './tasks.js';

const clearAll = document.querySelector('.todo-title__clear img');

function displayClearButton() {
    if (todoDB.length > 1) {
        document.querySelector('.todo-title__clear').style.display = 'flex';
    } else {
        document.querySelector('.todo-title__clear').style.display = 'none';
    }
}

displayClearButton();

// Delete one task

function deleteTask(id, db) {
    db.forEach((todo, item) => {
        if (todo.uniqueId == id) {
            db.splice(item, 1);
        }
    });
}

// Delete all tasks

function deleteAllTasks() {
    todoDB.splice(0, todoDB.length);
}

clearAll.addEventListener('click', () => {

    deleteAllTasks();
    successAlert.classList.add('display-flex');
    setTimeout(function () {
        successAlert.classList.remove('display-flex');
    }, 3000);
    localStorage.setItem('todo', JSON.stringify(todoDB));

    displayTasks(todoDB);
});

export {deleteTask, displayClearButton};