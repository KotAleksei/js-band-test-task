const toDoApp = document.getElementById('todoApp');
const createModalWindow = document.querySelector('.modalWindow');
const cancelCreateTodo = document.querySelector('.cancelCreateTodo');
const saveTodo = document.querySelector('.saveTodo');
const todoTitle = document.getElementById('createTodoTitle');
const todoDescription = document.getElementById('createTodoDescription');
const todoPriority = document.querySelector('.createTodoPriority');
const btnGreateTodo = document.querySelector('.btnGreateTodo');
const todoList = document.querySelector('.todoList');
const markOfDoneList = document.querySelector('.markOfDoneList');
const todosPriorityList = document.querySelector('.todosPriority');
const searchInput = document.getElementById('inputSearch');
const createTodoContent = document.querySelector('.createTodoContent');


export {
  toDoApp,
  createModalWindow,
  cancelCreateTodo,
  saveTodo,
  todoTitle,
  todoDescription,
  todoPriority,
  btnGreateTodo,
  todoList,
  markOfDoneList,
  todosPriorityList,
  searchInput,
  createTodoContent
};