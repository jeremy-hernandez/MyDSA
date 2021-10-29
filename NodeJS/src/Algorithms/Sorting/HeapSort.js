export { HeapSort };

/** Technically we already have a max-heap implementation in DataStructures. Here we will do a simplified implementation */
/** Sorts in increasing order for numbers right now */
const HeapSort = function (arr, isMaxHeap = false) {
  /** Passed in array, n is length of it */
  let n = arr.length;
  function heapify(n, i) {
    let indexLargest = i;
    let indexLeftChild = 2 * i + 1;
    let indexRightChild = 2 * i + 2;

    if (indexLeftChild < n && arr[indexLeftChild] > arr[indexLargest])
      indexLargest = indexLeftChild;
    if (indexRightChild < n && arr[indexRightChild] > arr[indexLargest])
      indexLargest = indexRightChild;

    if (indexLargest !== i) {
      [arr[i], arr[indexLargest]] = [arr[indexLargest], arr[i]];
      heapify(n, indexLargest);
    }
  }

  // builds a max heap
  // O(nlogn)
  if (!isMaxHeap)
    for (let i = Math.floor(n / 2) - 1; i >= 0; --i) heapify(n, i);

  // O(nlogn)
  for (let k = n - 1; k > 0; --k) {
    [arr[k], arr[0]] = [arr[0], arr[k]];
    heapify(k, 0);
  }
};

/**
 * [root,root-left,root-right]
 * [0,1,2]
 * left-child is 2n + 1 ^^^ 2(0) + 1 is index 1 (check)
 * right-schild is 2n + 2 ^^^ 2(0) + 2 is index 2 (check)
 * parent from left-child is floor((n - 1) / 2) ^^^ (1-1 // 2) = 0 (check)
 * parent from right-child is floor((n - 1) / 2) ^^^ (2 -1 //2) = 0 (check)
 */
