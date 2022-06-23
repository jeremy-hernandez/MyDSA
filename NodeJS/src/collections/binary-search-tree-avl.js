import { InvalidArgumentException } from '#src/errors/index.js';

export { AvlBST };

function AVLheight(node) {
  if (node === null) return 0;

  return node.height;
}

function AVLbalanceFactor(node) {
  if (node === null) return 0;

  return AVLheight(node.left) - AVLheight(node.right);
}

function AVLNewHeight(node) {
  let l = AVLheight(node.left);
  let r = AVLheight(node.right);
  return Math.max(l, r) + 1;
}

/** Rottation */
// r_ : Right. l_: Left.
// st: SubTree. tl: Tree-Left. tr: Tree-Right
function leftRotation(n) {
  let r_st = n.right; // new root
  let r_tl = r_st.left;

  r_st.left = n;
  n.right = r_tl;

  n.height = AVLNewHeight(n);
  r_st.height = AVLNewHeight(r_st);

  return r_st;
}

function rightRotation(n) {
  let l_st = n.left; // new root
  let l_tr = l_st.right;

  l_st.right = n;
  n.left = l_tr;

  n.height = AVLNewHeight(n);
  l_st.height = AVLNewHeight(l_st);

  return l_st;
}

function leftRightRotation(node) {
  node.left = leftRotation(node.left);
  return rightRotation(node);
}

function rightLeftRotation(node) {
  node.right = rightRotation(node.right);
  return leftRotation(node);
}

class AVLNode {
  constructor(k = 0, l = null, r = null) {
    this.key = k;
    this.height = 0;
    this.left = l;
    this.right = r;
  }
}

// duplicate keys not allowed
// could be enhanced to support a payload
class AvlBST {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  /** Access */
  find(key, useIterativeVariant = false) {
    return useIterativeVariant
      ? this.#findIterative(key)
      : this.#findRecursive(key);
  }

  #findRecursive(key, root) {
    if (!root) return undefined;
    if (root.key === key) return root;

    return key < root.key
      ? this.#findRecursive(root.key)
      : this.#findRecursive(root.key);
  }

  #findIterative(key) {
    let curr = this.root;

    while (curr) {
      if (curr === key) return curr;
      curr = key < curr.key ? curr.left : curr.right;
    }
    return undefined;
  }

  /** Insertions */
  insert(key, useIterativeVariant = false) {
    this.root = useIterativeVariant
      ? this.#insertIterative(key, this.root)
      : this.#insertRecursive(key, this.root);
    this.length += 1;
  }

  #insertRecursive(key, node) {
    if (!node) return new AVLNode(key);

    if (key === node.key)
      throw new InvalidArgumentException(`key {${key}} already exists`);

    if (key < node.key) node.left = this.#insertRecursive(key, node.left);
    else node.right = this.#insertRecursive(key, node.right);

    // fix height
    node.height = AVLNewHeight(node);

    let balance = AVLbalanceFactor(node);

    if (balance > 1) {
      return key < node.left.key
        ? rightRotation(node)
        : leftRightRotation(node);
    }
    if (balance < -1)
      return key > node.right.key
        ? leftRotation(node)
        : rightLeftRotation(node);

    return node;
  }

  #insertIterative(key, node) {
    let prev = new AVLNode(key);
    if (!node) return prev;

    let stack = [];
    let curr = node;
    while (curr != null) {
      stack.push(curr);
      if (key === curr.key)
        throw new InvalidArgumentException(`key {${key}} already exists`);
      curr = key > curr.key ? curr.right : curr.left;
    }

    while (stack.length > 0) {
      curr = stack.pop();

      if (key > curr.key) curr.right = prev;
      else curr.left = prev;

      // fix height
      curr.height = AVLNewHeight(curr);

      let balanceFactor = AVLbalanceFactor(curr);

      if (balanceFactor > 1)
        prev =
          key < curr.left.key ? rightRotation(curr) : leftRightRotation(curr);
      else if (balanceFactor < -1)
        prev =
          key > curr.right.key ? leftRotation(curr) : rightLeftRotation(curr);
      else prev = curr;
    }

    return prev;
  }

  /** Deletions */
  delete(key, useIterativeVariant = false) {
    this.root = useIterativeVariant
      ? this.#deleteIterative(key, this.root)
      : this.#deleteRecursive(key, this.root);

    return true;
  }

  #deleteRecursive(key, node) {
    if (!node) return node;

    //find key
    if (key < node.key) node.left = this.#deleteRecursive(key, node.left);
    else if (key > node.key)
      node.right = this.#deleteRecursive(key, node.right);
    else {
      // found key to delete
      if (!node.left || !node.right) {
        this.length -= 1;

        node = node.left ?? node.right;
      } else {
        // inorder successor
        let temp = node.right;
        while (temp.left) temp = temp.left;

        node.key = temp.key;
        this.#deleteRecursive(node.key, node.right);
      }
    }

    if (!node) return node;

    node.height = AVLNewHeight(node);

    let balanceFactor = AVLbalanceFactor(node);

    if (balanceFactor > 1)
      return AVLbalanceFactor(node.left) >= 0
        ? rightRotation(node)
        : leftRightRotation(node);

    if (balanceFactor < -1)
      return AVLbalanceFactor(node.right) <= 0
        ? leftRotation(node)
        : rightLeftRotation(node);

    return node;
  }

  #deleteIterative(key, root) {
    if (!root) return root;

    let stack = [];
    let curr = root;

    // last node in stack should be match
    while (curr) {
      let dir = key < curr.key ? 'left' : 'right';
      // when key is found if it has two children which means next will always be right (inorder successor)
      stack.push({ node: curr, next: dir });

      if (curr.key === key) break;
      curr = curr[dir];
    }

    // last node does not equal key
    if (!curr) return root;

    // cases for AVL tree deletion
    if (curr.left && curr.right) {
      // inorder successor
      let temp = curr.right;
      while (temp.left) temp = temp.left;

      curr.key = temp.key;
      // while this is calling itself, it will at most call itself once
      // O(1) recursive calls
      curr = this.#deleteIterative(temp.key, curr.right);
    } else {
      this.length -= 1;
      stack.pop();
      if (curr.left || curr.right) curr = curr.left || curr.right;
      else curr = null;
    }

    let prev = curr;
    while (stack.length > 0) {
      let item = stack.pop();
      curr = item.node;

      if (item.next !== 'none') curr[item.next] = prev;

      curr.height = AVLNewHeight(curr);

      let balance = AVLbalanceFactor(curr);

      if (balance > 1)
        curr =
          AVLbalanceFactor(curr.left) >= 0
            ? rightRotation(curr)
            : leftRightRotation(curr);

      if (balance < -1)
        curr =
          AVLbalanceFactor(curr.right) <= 0
            ? leftRotation(curr)
            : rightLu78yeftRotation(curr);

      prev = curr;
    }

    return curr;
  }

  /** Utility */
  isEmpty() {
    return this.root === null;
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
        let value = curr.key;
        curr = curr.right;

        return {
          done: false,
          value,
        };
      },
    };
  }
}
