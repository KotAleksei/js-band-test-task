import { 
  createModalWindow,
  cancelCreateTodo,
  saveTodo,
  todoTitle,
  todoDescription,
  todoPriority,
  btnGreateTodo,
  } from './projectConstants';
import {
  addTodo,
  editTodo,
} from './todoLogic';

btnGreateTodo.addEventListener('click', createTodoModal);

function createTodoModal(event, item) {
  let todo = {};
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
  
  cancelCreateTodo.addEventListener('click', callCancelTodo);
  saveTodo.addEventListener('click', callAddTodo);
  todoTitle.addEventListener('input', callTodoTitle);
  todoDescription.addEventListener('input', callTodoDescription);
  todoPriority.addEventListener('click', callTodoPriority);

      // functions for listeners
  function callAddTodo() {
    item ? editTodo(todo) : addTodo(todo); // if function arguments contain item,
                                      // should call editTodo, otherwise addTodo func
    resetData();
    removeListeners();
    createModalWindow.classList.remove('show');
  }

  function callCancelTodo() {
    resetData();
    removeListeners();
    createModalWindow.classList.remove('show');
  }

  function callTodoTitle(event) {
    todo.title = event.target.value;
  }

  function callTodoDescription(event) {
    todo.description = event.target.value;
  }

  function callTodoPriority(event) {
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

  // remove Listners and reset Data for new modal window
  function removeListeners() {
    cancelCreateTodo.removeEventListener('click', callCancelTodo);
    saveTodo.removeEventListener('click', callAddTodo);
    todoTitle.removeEventListener('input', callTodoTitle);
    todoDescription.removeEventListener('input', callTodoDescription);
    todoPriority.removeEventListener('click', callTodoPriority);
  }
  function resetData () {
    todoTitle.value = '';
    todoDescription.value = '';
    todoPriority.children[1].innerText = 'high';
    todoPriority.classList.contains('open') ? null : todoPriority.classList.add('open');
  }

  createModalWindow.classList.add('show');
}

export default createTodoModal;