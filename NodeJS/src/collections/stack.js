export { Stack };

/**
 * @description: An array based stack implementation
 */

class Stack {
  #CONTAINER;
  constructor() {
    this.#CONTAINER = [];
  }

  /** Access */
  peek() {
    return this.#CONTAINER.at(-1);
  }

  /** Insertions */
  push(item) {
    this.#CONTAINER.push(item);
    return true;
  }

  /** Deletions */
  pop() {
    return this.#CONTAINER.pop();
  }

  /** Utility */
  isEmpty() {
    return this.#CONTAINER.length === 0;
  }
}
