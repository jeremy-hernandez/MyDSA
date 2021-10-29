export { SinglyLinkedList };

class SlNode {
  constructor(_value = 0, _next = null) {
    this.value = _value;
    this.next = _next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /** Access */
  get(index) {
    //O(n)
    if (index < 0 || index >= this.length) return undefined;

    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      curr = curr.next;
    }

    return curr;
  }

  /** Updates */
  set(index, value) {
    let node = this.get(index);
    if (!node) return false;

    node.value = value;

    return true;
  }

  /** Insertions */
  prepend(value) {
    //O(1)
    let node = new SlNode(value, this.head);

    if (!this.head) this.tail = node;
    this.head = node;

    ++this.length;
  }

  append(value) {
    //O(1)
    let node = new SlNode(value);

    if (!this.head) {
      // Edge Case: We currently have no elements in the list.
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }

    ++this.length;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    if (index === this.length) this.append(value);
    else if (index === 0) this.prepend(value);
    else {
      let pre = this.get(index - 1);
      let node = new SlNode(value, pre.next);

      pre.next = node;

      ++this.length;
    }
    return true;
  }

  /** Deletions */
  popFront() {
    //O(1)
    if (!this.head) return undefined;

    let node = this.head;
    this.head = this.head.next;

    --this.length;

    //Edge Case: emptied list
    if (!this.head) this.tail = null;

    return node;
  }

  pop() {
    //O(n)
    if (!this.head) return undefined;

    let node = this.head;

    if (this.length > 1) {
      while (node.next !== this.tail) node = node.next;

      // swap node and tail;
      this.tail = node;
      node = node.next;

      // update tail.next
      this.tail.next = null;
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
      let pre = this.get(index - 1);
      pre.next = pre.next.next;

      --this.length;
    }

    return true;
  }

  /** Utility */
  isEmpty() {
    return this.head == null;
  }

  /** Iterators */
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
