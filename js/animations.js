import {
    addTaskButton
} from './tasks.js';

// Rotate animation
function rotateAnimationAdd() {
    addTaskButton.classList.add('rotate-addButton');
}

function rotateAnimationRemove() {
    addTaskButton.classList.remove('rotate-addButton');
}

addTaskButton.addEventListener("animationend", rotateAnimationRemove, false);

export {
    rotateAnimationAdd
};