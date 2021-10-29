// O(nk) k number of digits
// O(n^2) worst case if k ~= n
// Space: O(n+k)
export {};

function getDigit(num, digit) {
  num = Math.floor(Math.abs(num) / Math.pow(10, digit));
  let ret = num % 10;
  return ret;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(arr) {
  let largest = 0;
  for (let i of arr) {
    let temp = digitCount(i);
    largest = Math.max(largest, temp);
  }
  return largest;
}

function RadixSort(arr) {
  let maxDigit = mostDigits(arr);

  for (let i = 0; i < maxDigit; ++i) {
    let buckets = Array.from({ length: 10 }, () => []);
    for (let e of arr) {
      let digit = getDigit(e, i);
      buckets[digit].push(e);
    }

    arr = [].concat(...buckets);
  }
  return arr;
}

function main() {
  let a1 = [1556, 10, 450, 10000, 321, 3441, 1231, 5325, 123, 55, 2, 1];
  let res = RadixSort(a1);
  console.log(res);
}

main();
