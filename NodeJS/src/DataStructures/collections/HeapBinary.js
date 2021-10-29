export { MaxBinaryHeap };
/*
 *  given a heap: [100,50,45,5,4,3,1]
 *  suppose root = i
 *  left of root is 2*i + 1
 *  right of root is 2*i + 2
 *  parent is floor((i-1) / 2)
 */
class MaxBinaryHeap {
  constructor() {
    this.heap = [];
  }

  // Insertions
  insert(value) {
    //O(logn)
    try {
      this.heap.push(value);
      this.siftUp();
      return true;
    } catch (err) {}
  }

  // Removals
  extract() {
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
      if (el > this.heap[parentIdx]) {
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
        this.heap[lChildIdx] > this.heap[rChildIdx] ? lChildIdx : rChildIdx;

      if (el < this.heap[choose]) {
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

let maxHeap = new MaxBinaryHeap();
