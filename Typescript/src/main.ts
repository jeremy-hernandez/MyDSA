import { addListItem, addUlChild } from './utils/page.util';

let ROOT = document.getElementById('root');

// really bad
if (ROOT) {
  let ulElement = addUlChild(ROOT);
  let item = addListItem(ulElement);
  item.innerText = 'My first list item from ts';
  item.style.borderBottom = '1px solid black';
}
