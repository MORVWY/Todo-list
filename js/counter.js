import {todoDB,todoCounter } from './app.js';

// Todo counter
function taskCounter() {
    todoCounter.value = todoDB.length;
}

export {taskCounter};