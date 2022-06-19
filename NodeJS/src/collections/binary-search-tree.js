import { InvalidArgumentException } from '#src/misc/Exceptions';

export { BinarySearchTree };

class BSTNode {
  constructor(_key = 0, _left = null, _right = null) {
    this.key = _key;
    this.left = _left;
    this.right = _right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  /** Access */
  find(key) {
    //O(logn) | Worst: O(n)
    if (!this.root) return undefined;

    let current = this.root;
    while (current !== null) {
      if (key === current.key) return current;
      if (key < current.key) current = current.left;
      else current = current.right;
    }
    return undefined;
  }

  /** Insertions */
  insert(key, useIterativeVariant = false) {
    if (!this.root) this.root = new BSTNode(key);
    else {
      if (useIterativeVariant) this.#insertIterative(key);
      else this.#insertRecursive(key, this.root);
    }
    this.length += 1;
    return true;
  }

  #insertRecursive(key, root) {
    if (!root) return undefined;

    if (!root.left && key < root.key) root.left = new BSTNode(key);
    else if (!root.right && key > root.key) root.right = new BSTNode(key);
    else {
      if (key > root.key) this.#insertRecursive(key, root.right);
      else this.#insertIterative(key, root.left);
    }
  }

  #insertIterative(key) {
    //O(logn) | O(n)
    let node = new BSTNode(key);
    if (!this.root) this.root = node;
    else {
      let curr = this.root;
      while (true) {
        if (key === curr.key)
          throw InvalidArgumentException(`key {${key}} alraedy in tree`);

        if (key < curr.key) {
          if (!curr.left) {
            curr.left = node;
            break;
          }
          curr = curr.left;
        } else {
          if (!curr.right) {
            curr.right = node;
            break;
          }
          curr = curr.right;
        }
      }
    }
  }

  /** Deletions */
  remove(key, useIterativeVariant = false) {
    if (!this.root) return undefined;

    if (useIterativeVariant) this.#removeIterative(key);
    else this.#removeRecursive(key, this.root);

    return true;
  }

  #removeRecursive(key, root) {
    if (!root) return null;

    if (key < root.key) root.left = this.#removeRecursive(key, root.left);
    else if (key > root.key)
      root.right = this.#removeRecursive(key, root.right);
    else {
      if (!(root.left && root.right)) {
        this.length -= 1;
        return root.left ? root.left : root.right;
      }

      // Inorder successor:
      let curr = root.right;
      while (curr.left) curr = curr.left;

      root.key = curr.key;

      this.#removeRecursive(curr.key, root.right);
    }

    return root;
  }

  #removeIterative(key) {
    let curr = this.root;
    let parent = null;

    while (curr && curr.key !== key) {
      parent = curr;
      curr = key < curr.key ? curr.left : curr.right;
    }

    if (!curr) return;

    this.length -= 1;

    // one or no children
    if (!(curr.left && curr.right)) {
      let replace = curr.left ? curr.left : curr.right;
      if (!parent) this.root = replace;
      else {
        if (curr === parent.left) parent.left = replace;
        else parent.right = replace;
      }
      return;
    }

    // two children
    let successor = curr.right;
    let successor_parent = null;
    while (successor.left) {
      successor_parent = successor;
      successor = successor.left;
    }

    if (successor_parent) successor_parent.left = successor.right;
    else curr.right = successor.right;

    curr.key = successor.key;
  }

  /* Iterators */
  [Symbol.iterator]() {
    /** Returns in order traversal of tree */
    let stack = [];
    let curr = this.root;
    return {
      next: () => {
        if (!stack.length && !curr) return { done: true };
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        curr = stack.pop();
        let key = curr.key;
        curr = curr.right;

        return {
          done: false,
          value: key,
        };
      },
    };
  }
}
