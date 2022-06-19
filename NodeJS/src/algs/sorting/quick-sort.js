// uses a pivot
// Complexity. O(nlogn) | worst: O(n^2) [elements are in ascending or descending order and we pick min each time or max each time]
// Space. O(log(n))

export {};

function Pivot(arr, start, end) {
  //decide what the pivot will be
  //assuming the first element
  let mypivot = arr[start];
  let pivotIdx = start;

  for (let i = start + 1; i <= end; ++i) {
    if (arr[i] < mypivot) {
      ++pivotIdx;
      [arr[pivotIdx], arr[i]] = [arr[i], arr[pivotIdx]];
    }
  }

  [arr[start], arr[pivotIdx]] = [arr[pivotIdx], arr[start]];
  return pivotIdx;
}

function QuickSort(arr, start, end, comparer) {
  if (start < end) {
    let pi = Pivot(arr, start, end);

    QuickSort(arr, start, pi - 1);
    QuickSort(arr, pi + 1, end);
  }
}

function main() {
  let a1 = [4, 1, 5, 6, -10, -6, 100, 200, 2, 3, 3, 2, -7, 5.1];
  QuickSort(a1, 0, a1.length - 1, null);
  console.log(a1);
}

main();
