export {};

class Node {
  constructor(val, prio) {
    this.value = val;
    this.priority = prio;
  }
}

// Does not account for same priority order. (queues should return maintain FIFO order of like priority)
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Insertions
  Enqueue(val, prio) {
    //O(logn)
    try {
      let node = new Node(val, prio);
      this.heap.push(node);
      this.siftUp();
      return true;
    } catch (err) {}
  }

  // Removals
  Dequeue() {
    //O(logn)
    if (this.heap.length === 0) return undefined;

    let ret = this.heap[0];
    let lastElement = this.heap.pop();
    if (this.heap.length !== 0) {
      this.heap[0] = lastElement;
      this.siftDown();
    }

    return ret;
  }

  // Helpers
  siftUp() {
    let idx = this.heap.length - 1;
    let el = this.heap[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (el.priority > this.heap[parentIdx].priority) {
        [this.heap[idx], this.heap[parentIdx]] = [
          this.heap[parentIdx],
          this.heap[idx],
        ];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  siftDown() {
    let idx = 0;
    let el = this.heap[idx];
    while (idx < this.heap.length) {
      let lChildIdx = idx * 2 + 1;
      let rChildIdx = idx * 2 + 2;

      let choose =
        this.heap[lChildIdx]?.priority > this.heap[rChildIdx]?.priority
          ? lChildIdx
          : rChildIdx;

      if (el?.priority < this.heap[choose]?.priority) {
        [this.heap[idx], this.heap[choose]] = [
          this.heap[choose],
          this.heap[idx],
        ];
        idx = choose;
      } else {
        break;
      }
    }
  }
}

let pQueue = new PriorityQueue();

pQueue.Enqueue(100, 5);
pQueue.Enqueue(1, 1000);
pQueue.Enqueue(1000, 100);

console.log(pQueue.heap);
pQueue.Dequeue();
console.log(pQueue.heap);
