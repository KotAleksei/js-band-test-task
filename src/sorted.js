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
  let TITLE_DROPDOWN = 'all';
  elem.addEventListener('click', (event) => {
    TITLE_DROPDOWN = event.target.textContent;
    elem.children[0].innerText = TITLE_DROPDOWN;
  
    if(elem === markOfDoneList) {
      sortBy.completed = TITLE_DROPDOWN;
      sortedRender(sortBy);
    }
    if(elem === todosPriorityList) {
      sortBy.priority = TITLE_DROPDOWN;
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

