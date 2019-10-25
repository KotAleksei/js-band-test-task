import {
  todoList
} from './projectConstants';
import greateTodoModal from './greateTodoModal';
let todos = [];

function addTodo(todo) {
      todos.push(todo);
      todoList.insertAdjacentHTML('afterbegin', `
      <li class="todoItem show" data-key="${todo.id}">
        <h2>${todo.title}</h2>
        <p>${todo.description}</p>
        <div class="todoFotter">
          <div class="todoPriority" data-priority="${todo.id}">${todo.priority}</div>
          <div class="dropdownEditTodo">
          <button data-id="${todo.id}">...</button>
          <ul>
            <li>done</li>
            <li>edit</li>
            <li>delete</li>
          </ul>
        </div>
        </div>
      </li>
    `);
  const dropdown = document.querySelector(`[data-id='${todo.id}']`);
  const nextNode = dropdown.nextElementSibling;
  dropdown.addEventListener('click', () => {
    dropdown.parentElement.classList.toggle('open');
  });
  nextNode.addEventListener('click', () => {
    dropdown.parentElement.classList.toggle('open');
  });
}

function deleteTodo(key) {
  const todo = document.querySelector(`[data-key='${key}']`);
  todos = todos.filter(todo => Number(todo.id) !== Number(key));

  todo.remove();
}
function toggleDoneTodo(key) {
  const todo = document.querySelector(`[data-key='${key}']`);
  const findTodo = todos.find(item => Number(item.id) === Number(key));
  
  // reversal todoItem in DOM
  todo.remove();
  todo.classList.contains('done') ? todoList.prepend(todo) : todoList.append(todo);
  todo.classList.toggle('done');

  // change todo.done in todos
  findTodo.done = todo.classList.contains('done');
}
function editTodo(item) {
  const todo = document.querySelector(`[data-key='${item.id}']`);
  const title = todo.children[0];
  const description = todo.children[1];
  const priority = todo.children[2].children[0];

  title.innerText = item.title;
  description.innerText = item.description;
  priority.innerText = item.priority;

  todos = todos.map(todoItem => {
    if(Number(todoItem.id) === Number(item.id)){
      todoItem = { ...item };
    }
    return todoItem;
  });
}

function sortedRender(sortBy) {
  todos.map(item => {
    const itemTodo = document.querySelector(`[data-key='${item.id}']`);
    const itemPriority = document.querySelector(`[data-priority='${item.id}']`);
    const visibleTodo = itemTodo.classList.contains('show');
    const todoDone = itemTodo.classList.contains('done');

    if(sortBy.searchText !== ''){
      if(!item.title.includes(sortBy.searchText)){
        itemTodo.classList.remove('show');
      } else {
        visibleTodo ? null : itemTodo.classList.add('show');
      }
    } else {
      visibleTodo ? null : itemTodo.classList.add('show');
    }

    if(sortBy.priority !== 'all'){
      if(sortBy.priority !== itemPriority.textContent){
        itemTodo.classList.remove('show');
      }
    } 

    if(sortBy.completed !== 'all'){
      if(sortBy.completed === 'open'){
        if(todoDone) {
          itemTodo.classList.remove('show');
        }
      } else if(sortBy.completed === 'done') {
        if(!todoDone) {
          itemTodo.classList.remove('show');
        }
      }
    } 

  });
}



todoList.addEventListener('click', event => {
  if(event.target.tagName === 'LI') {
    const callDropdownItem = item => {
      const todoItem = event.target.parentElement.parentElement.parentElement.parentElement;
      const itemKey = todoItem.dataset.key;
      switch (item) {
        case 'delete': { 
          deleteTodo(itemKey);
          break;
        }
        case 'done': {
          toggleDoneTodo(itemKey);
          break;
        }
        case 'edit': {
          const findTodo = todos.find(item => Number(item.id) === Number(itemKey));
          greateTodoModal(null, findTodo);
          break;
        }
      }
    };
    callDropdownItem(event.target.textContent);
  }
});


export {
  addTodo,
  deleteTodo,
  editTodo,
  sortedRender
};