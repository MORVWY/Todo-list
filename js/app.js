import {displayTasks} from './tasks.js';

// DOM
export const userName = document.querySelector('.greeting-item'),
taskList = document.querySelector('.todo-list'),
todoCounter = document.querySelector('.todo-title__counter input');

// Task DB
export let todoDB = [];

// User name local storage 
const userNameLocal = localStorage.getItem('userNameLocal') || '';

userName.value = userNameLocal;

userName.addEventListener('change', (e) => {
    localStorage.setItem('userNameLocal', e.target.value);
});

// TodoDB local storage
if (localStorage.getItem('todo')) {
    todoDB = JSON.parse(localStorage.getItem('todo'));
    displayTasks(todoDB);
}