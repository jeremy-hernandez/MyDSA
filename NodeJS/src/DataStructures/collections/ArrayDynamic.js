import { InvalidArgumentException } from '#src/misc/Exceptions';

export { DynamicArray };

class DynamicArray {
  #CAPACITY;
  #LIST;

  constructor(size = 10) {
    if (size < 1)
      throw new InvalidArgumentException(
        'DynamicArray constructor error',
        'size'
      );
    this.#CAPACITY = size;
    this.#LIST = Array(this.#CAPACITY);
    this.size = 0;
  }

  /** Access */
  get(index, _default = undefined) {
    if (index > 0 && index >= this.size) return _default;
    if (index < 0 && Math.abs(index) > this.size) return _default;

    if (index < 0) return this.#LIST[this.size - Math.abs(index)];
    return this.#LIST[index];
  }

  /** Updates */
  set(index, v) {
    try {
      this.#checkIndex(index);
      this.#LIST[index] = v;
    } catch (error) {
      throw error;
    }
  }

  /** Insertions */
  prepend(v) {
    ++this.size;
    if (this.#isListFull()) this.#resizeList();

    this.#shiftRight(0);

    this.#LIST[0] = v;
  }

  append(v) {
    ++this.size;
    if (this.#isListFull()) this.#resizeList();

    this.#LIST[this.size - 1] = v;
  }

  insert(index, v) {
    try {
      this.#checkIndex(index);

      ++this.size;
      if (this.#isListFull()) this.#resizeList();

      this.#shiftRight(index);

      this.#LIST[index] = v;
    } catch (error) {
      throw error;
    }
  }

  /** Deletions */
  popFront() {
    if (this.size === 0) return undefined;

    let item = this.#LIST[0];
    this.size -= 1;

    this.#shiftLeft(0);

    return item;
  }

  pop() {
    if (this.size === 0) return undefined;

    let item = this.#LIST[this.size - 1];
    this.size -= 1;

    return item;
  }

  remove(index) {
    try {
      /** If removing last element we need to subtract size before checking index. if checkindex throws an exception, we fix size */
      this.size -= 1;
      this.#checkIndex(index);
    } catch (error) {
      this.size += 1;
      throw error;
    }

    try {
      let item = this.#LIST[index];
      this.#shiftLeft(index);
      return item;
    } catch (error) {
      throw error;
    }
  }

  /** Utility */
  getCapacity() {
    return this.#CAPACITY;
  }

  isEmpty() {
    return this.size === 0;
  }

  /** Iterators */
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i >= this.size) return { done: true };
        const value = this.#LIST[i++];
        return {
          done: false,
          value,
        };
      },
    };
  }

  /** Private */
  #isListFull = () => this.size === this.#CAPACITY;

  #checkIndex(index) {
    if (typeof index !== 'number')
      throw TypeError('MyArray index must be an integer');
    if (index - Math.floor(index) !== 0 || index < 0 || index > this.size)
      throw RangeError('Index out of range');
  }

  #resizeList() {
    this.#CAPACITY *= 2;
    let newArr = Array(this.#CAPACITY);

    for (let k = 0; k < this.size; ++k) {
      newArr[k] = this.#LIST[k];
    }
    this.#LIST = newArr;

    /** using ES6 destructing, the above can be simplified */
    // this.#LIST = [...this.#LIST, ...Array(this.#CAPACITY).fill(0)];
    // this.#CAPACITY *= 2;
  }

  #shiftRight(index) {
    for (let k = this.size - 1; k > index; --k)
      this.#LIST[k] = this.#LIST[k - 1];
  }

  #shiftLeft(index) {
    for (let k = index; k < this.size; ++k) this.#LIST[k] = this.#LIST[k + 1];
  }
}
