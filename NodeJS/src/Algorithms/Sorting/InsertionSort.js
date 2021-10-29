export { NaiveInsertionSort };

//Complexity: Worst O(n^2), Best O(n)
function NaiveInsertionSort(arr, comparer) {
  for (let i = 1; i < arr.length; ++i) {
    let val = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > val; --j) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = val;
  }
}
