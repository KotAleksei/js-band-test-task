import { 
  createModalWindow,
  cancelCreateTodo,
  todoTitle,
  todoDescription,
  todoPriority,
  btnGreateTodo,
  createTodoContent
  } from './projectConstants';
import {
  addTodo,
  editTodo,
} from './todoLogic';

btnGreateTodo.addEventListener('click', createTodoModal);

function createTodoModal(event, hasEditTodo) {
  createModalWindow.classList.add('show');
  let todo = {};

        // functions for listeners
  const callChangeTodoTitle = inputEvent => todo.title = inputEvent.target.value.trim();
  const callChangeTodoDescription = inputEvent => todo.description = inputEvent.target.value.trim();
  const callTodoPriority = clickEvent => {
    let TODO_PRIORITY = '';
    
    if(clickEvent.target.tagName === 'BUTTON'){
      todoPriority.classList.toggle('open');
    }
    if(clickEvent.target.tagName === 'LI') {
      TODO_PRIORITY = clickEvent.target.textContent;
      todoPriority.children[1].innerText = TODO_PRIORITY;
      todo.priority = TODO_PRIORITY;
    }
  }
  const callCancelTodo = () => {
    const hasEmptyTitleMessage = document.querySelector('.emptyTitle');

    resetData();
    removeListeners();
    createModalWindow.classList.remove('show');
    hasEmptyTitleMessage ? hasEmptyTitleMessage.remove() : null;
  }
  const callSubmit = submitEvent => {
    const hasEmptyTitleMessage = document.querySelector('.emptyTitle');
    const errorText = 'Please fill this field';
    
    submitEvent.preventDefault();
    if(todo.title === '') {
      if(!hasEmptyTitleMessage) {
        todoTitle.insertAdjacentHTML('beforebegin', `
        <p class="emptyTitle">${errorText}</p>
      `);
      }
    } else {
      hasEditTodo ? editTodo(todo) : addTodo(todo); 
      resetData();
      removeListeners();
      createModalWindow.classList.remove('show');
      hasEmptyTitleMessage ? hasEmptyTitleMessage.remove() : null;
    }
  }
  const setTitleFocus = () => todoTitle.focus();
  
  if(hasEditTodo) {
    todo = { ...hasEditTodo };
    todoTitle.value = todo.title;
    todoDescription.value = todo.description;
    todoPriority.children[1].innerText = todo.priority;
  } else {
    const newTodo = {
      id: Date.now(),
      done: false,
      description: '',
      title: '',
      priority: 'high'
    }; 
    todo = { ...newTodo };
  }
  
  window.setTimeout(setTitleFocus, 0);
  todoTitle.addEventListener('input', callChangeTodoTitle);
  todoDescription.addEventListener('input', callChangeTodoDescription);
  todoPriority.addEventListener('click', callTodoPriority);
  cancelCreateTodo.addEventListener('click', callCancelTodo);
  createTodoContent.addEventListener('submit', callSubmit);

  // remove Listeners and reset Data for new modal window
  function removeListeners() {
    todoTitle.removeEventListener('input', callChangeTodoTitle);
    todoDescription.removeEventListener('input', callChangeTodoDescription);
    todoPriority.removeEventListener('click', callTodoPriority);
    cancelCreateTodo.removeEventListener('click', callCancelTodo);
    createTodoContent.removeEventListener('submit', callSubmit);
  }
  function resetData () {
    todoTitle.value = '';
    todoDescription.value = '';
    todoPriority.children[1].innerText = 'high';
    todoPriority.classList.contains('open') ? null : todoPriority.classList.add('open');
  }
}

export default createTodoModal;