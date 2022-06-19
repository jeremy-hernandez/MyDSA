export { NaiveSelectionSort, OptimizedSelectionSort };

//Complexity: O(n^2)
function NaiveSelectionSort(arr, comparer) {
  for (let i = 0; i < arr.length; ++i) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; ++j) {
      if (comparer(arr[j], arr[minIdx])) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
}

function OptimizedSelectionSort(arr, comparer) {
  for (let i = 0; i < arr.length; ++i) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; ++j) {
      if (comparer(arr[j], arr[minIdx])) {
        minIdx = j;
      }
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
}
