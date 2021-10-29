export { NaiveBubbleSort, OptimizedBubbleSort };

//Implementation 1: No optimizations
function NaiveBubbleSort(arr, comparer) {
  for (let i = arr.length - 1; i > 0; --i) {
    for (let j = 0; j < i; ++j) {
      let order = comparer(arr[j], arr[j + 1]);
      // if order is > 0 we swap up
      if (order > 0) {
        // new ES6 swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
//Time Complexity:
// Best: O(n^2) | Average: O(n^2) | Worst: O(n^2)

//Implementation 2: Optimize a sorted or nearly sorted list
// We do this by checking swaps: if no swaps occur on an iteration, we can short circuit
function OptimizedBubbleSort(arr, comparer) {
  for (let i = arr.length - 1; i > 0; --i) {
    let hadSwap = false;
    for (let j = 0; j < i; ++j) {
      let order = comparer(arr[j], arr[j + 1]);
      // if order is > 0 we swap up
      if (order > 0) {
        // new ES6 swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        hadSwap = true;
      }
    }
    if (!hadSwap) {
      break;
    }
  }
}
//Time Complexity:
// Best: O(n) | Average: O(n^2) | Worst: O(n^2)

//Implementation 3: "Cleaner Code"
function CleanerBubbleSort(arr, comparer) {
  //TODO
}
