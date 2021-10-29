export { Queue };

/**
 * @description A array based queue implementation
 */

class Queue {
  #QUEUE;
  constructor() {
    this.#QUEUE = [];
  }

  /** Access */
  peek() {
    return this.#QUEUE[0];
  }

  /** Insertions */
  enqueue(v) {
    this.#QUEUE.push(v);
    return true;
  }

  /** Deletions */
  deQueue() {
    return this.#QUEUE.shift();
  }
}
