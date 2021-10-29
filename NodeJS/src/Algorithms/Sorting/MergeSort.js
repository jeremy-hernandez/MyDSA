// Divide and conquer Algorithm
// Complexity: O(n*logn)
// -- Log(n) splits. -- n comparisons at each merge
// Space Complexity: O(n)
// -- n new arrays

export { MergeSort };

function pushAndIncrement(arr, val, pt) {
  arr.push(val);
  return ++pt;
}

function MergeStep(arr1, arr2) {
  let sorted = [];
  let pt1 = 0,
    pt2 = 0;

  while (pt1 < arr1.length && pt2 < arr2.length) {
    if (arr1[pt1] < arr2[pt2]) pt1 = pushAndIncrement(sorted, arr1[pt1], pt1);
    else pt2 = pushAndIncrement(sorted, arr2[pt2], pt2);
  }

  while (pt1 < arr1.length) pt1 = pushAndIncrement(sorted, arr1[pt1], pt1);

  while (pt2 < arr2.length) pt2 = pushAndIncrement(sorted, arr2[pt2], pt2);

  return sorted;
}

function DivideStep(arr) {
  let mid = Math.floor(arr.length / 2);
  let h1 = arr.slice(0, mid);
  let h2 = arr.slice(mid);
  return [h1, h2];
}

function MergeSort(arr, comparer) {
  if (arr.length <= 1) return arr;

  let [h1, h2] = DivideStep(arr);

  let merged = MergeStep(MergeSort(h1), MergeSort(h2));

  return merged;
}
