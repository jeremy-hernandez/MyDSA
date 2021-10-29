export { DoublyLinkedList };

export class DllNode {
  constructor(_value = 0, _next = null, _prev = null) {
    this.value = _value;
    this.next = _next;
    this.prev = _prev;
  }
}

// Currently, minimal bound checking and error handling. assumes good input/testing
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /* Access */
  get(index) {
    if (this.head !== null) {
      let node = this.head;
      while (index > 0) {
        node = node.next;
        --index;
      }
      return node;
    }
    return undefined;
  }

  getBack(index) {
    if (this.head !== null) {
      let node = this.tail;
      while (index > 0) {
        node = node.prev;
        --index;
      }
      return node;
    }
    return undefined;
  }

  /* Updates */
  set(index, value) {
    let node = this.get(index);
    if (!node) return false;

    node.value = value;

    return true;
  }

  /* Insertions */
  prepend(value) {
    //O(1)
    let node = new DllNode(value, this.head);

    if (!this.head) this.tail = node;
    this.head = node;

    ++this.length;
  }

  append(value) {
    //O(1)
    let node = new DllNode(value);

    if (!this.head) {
      // Edge Case: We currently have no elements in the list.
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    ++this.length;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    if (index === this.length) this.append(value);
    else if (index === 0) this.prepend(value);
    else {
      let nodeAt = this.get(index);
      let node = new DllNode(value, nodeAt, nodeAt.prev);
      nodeAt.prev.next = node;
      nodeAt.prev = node;

      ++this.length;
    }
    return true;
  }

  /* Deletions */
  popFront() {
    //O(1)
    if (!this.head) return undefined;

    let node = this.head;
    this.head = node.next;
    this.head.prev = null;

    --this.length;

    //Edge Case: emptied list
    if (!this.head) this.tail = null;

    return node;
  }

  pop() {
    //O(n)
    if (!this.head) return undefined;

    let node = this.tail;

    if (this.length > 1) {
      node.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      //Edge Case: 1 item in list
      this.head = null;
      this.tail = null;
    }

    --this.length;

    return node;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return false;

    if (index === 0) this.popFront();
    else if (index === this.length - 1) this.pop();
    else {
      let nodeAt = this.get(index);

      nodeAt.prev.next = nodeAt.next;
      nodeAt.next.prev = nodeAt.prev;

      --this.length;
    }

    return true;
  }

  /* Utility */
  isEmpty() {
    return this.head === null;
  }

  /* Iterators */
  [Symbol.iterator]() {
    let node = this.head;
    return {
      next: () => {
        if (!node) return { done: true };

        const value = node.value;
        node = node.next;
        return {
          done: false,
          value,
        };
      },
    };
  }
}
