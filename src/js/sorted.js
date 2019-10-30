import {
  markOfDoneList,
  todosPriorityList,
  searchInput
} from './projectConstants';
import {
  sortedRender
} from './todoLogic';

const sortBy = {
  searchText: '',
  priority: 'all',
  completed: 'all',
};

function dropDown(elem) {
  let titleDropdownText = 'all';
  elem.addEventListener('click', (event) => {
    titleDropdownText = event.target.textContent;
    elem.children[0].innerText = titleDropdownText;
  
    if(elem === markOfDoneList) {
      sortBy.completed = titleDropdownText;
      sortedRender(sortBy);
    }
    if(elem === todosPriorityList) {
      sortBy.priority = titleDropdownText;
      sortedRender(sortBy);
    }
    if(event.target.tagName === 'BUTTON'){
      elem.classList.toggle('open');
    }
  });
}

function searchByTitle(elem) {
  elem.addEventListener('input', (event) => {
    sortBy.searchText = event.target.value.trim();
    sortedRender(sortBy);
  });
}

searchByTitle(searchInput);
dropDown(markOfDoneList);
dropDown(todosPriorityList);

export default sortBy;

