import { 
  createModalWindow,
  cancelCreateTodo,
  saveTodo,
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

function createTodoModal(event, item) {
  createModalWindow.classList.add('show');
  
  let todo = {};
        // functions for listeners
  const callChangeTodoTitle = inputEvent => todo.title = inputEvent.target.value;
  const callChangeTodoDescription = inputEvent => todo.description = inputEvent.target.value;
  
  const callCancelTodo = () => {
    const hasEmptyTitleMessage = document.querySelector('.emptyTitle');
    resetData();
    removeListeners();
    createModalWindow.classList.remove('show');
    
    hasEmptyTitleMessage ? hasEmptyTitleMessage.remove() : null;
  }

  const callSubmit = event => {
    event.preventDefault();

    const hasEmptyTitleMessage = document.querySelector('.emptyTitle');
    const errorText = 'Please Enter This Field';
    if(todo.title === '') {
      if(!hasEmptyTitleMessage) {
        todoTitle.insertAdjacentHTML('beforebegin', `
        <p class="emptyTitle">${errorText}</p>
      `);
      }
    } else {
      item ? editTodo(todo) : addTodo(todo); 
      resetData();
      removeListeners();
      createModalWindow.classList.remove('show');
      hasEmptyTitleMessage ? hasEmptyTitleMessage.remove() : null;
    }
  }

  
  const callTodoPriority = event => {
    let TODO_PRIORITY = '';
    
    if(event.target.tagName === 'BUTTON'){
      todoPriority.classList.toggle('open');
    }
    if(event.target.tagName === 'LI') {
      TODO_PRIORITY = event.target.textContent;
      todoPriority.children[1].innerText = TODO_PRIORITY;
      todo.priority = TODO_PRIORITY;
    }
  }

  const setTitleFocus = () => todoTitle.focus();
  
  if(item) {
    todo = { ...item };
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
  cancelCreateTodo.addEventListener('click', callCancelTodo);
  todoTitle.addEventListener('input', callChangeTodoTitle);
  todoDescription.addEventListener('input', callChangeTodoDescription);
  todoPriority.addEventListener('click', callTodoPriority);
  createTodoContent.addEventListener('submit', callSubmit);

  // remove Listners and reset Data for new modal window
  function removeListeners() {
    cancelCreateTodo.removeEventListener('click', callCancelTodo);
    todoTitle.removeEventListener('input', callChangeTodoTitle);
    todoDescription.removeEventListener('input', callChangeTodoDescription);
    todoPriority.removeEventListener('click', callTodoPriority);
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