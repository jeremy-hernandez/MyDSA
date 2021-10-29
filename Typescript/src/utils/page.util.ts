export function addUlChild(Root: HTMLElement): HTMLUListElement {
  let html = document.createElement('ul');
  let ref = Root.appendChild(html);
  return ref;
}

export function addListItem(UlElement: HTMLUListElement): HTMLLIElement {
  let html = document.createElement('li');
  let ref = UlElement.appendChild(html);
  return ref;
}
