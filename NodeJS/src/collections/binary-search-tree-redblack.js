import { InvalidArgumentException } from '#src/errors/index.js';

export { RedBlackBST };

const COLOR = { RED: false, BLACK: true };

/** color: red if false, black if true */
class RBNode {
  constructor(
    key,
    left = null,
    right = null,
    parent = null,
    color = COLOR.RED
  ) {
    this.key = key;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.color = color;
  }
}

class NilNode extends RBNode {
  constructor() {
    super(0);
    this.color = COLOR.BLACK;
  }
}

// Helpful guide: https://www.happycoders.eu/algorithms/red-black-tree-java/
/** Constraints
 * Each node is red or black
 * Root is black (not technically required)
 * All NIL leaves are black
 * Red node does not have red children
 * All paths from root to nil have same number of black nodes
 */
class RedBlackBST {
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
  insert(key) {
    let node = this.root;
    let parent = null;

    // Discover where to insert node
    while (node) {
      parent = node;
      if (key === node.key)
        throw new InvalidArgumentException('Key already exists');

      node = key < node.key ? node.left : node.right;
    }

    let newNode = new RBNode(key);
    newNode.color = COLOR.RED;
    if (!parent) this.root = newNode;
    else if (key < parent.key) parent.left = newNode;
    else parent.right = newNode;

    newNode.parent = parent;

    this.length += 1;

    this.#fixInsert(newNode);
  }

  #fixInsert(node) {
    let parent = node.parent;

    if (!parent) {
      node.color = COLOR.BLACK;
      return;
    }

    if (parent.color === COLOR.BLACK) return;

    let gp = parent.parent;
    if (!gp) {
      parent.color = COLOR.BLACK;
      return;
    }

    let uncle = this.#getUncle(parent);
    if (uncle && uncle.color === COLOR.RED) {
      parent.color = COLOR.BLACK;
      gp.color = COLOR.RED;
      uncle.color = COLOR.BLACK;

      this.#fixInsert(gp);
    } else {
      if (parent === gp.left) {
        if (node === parent.right) {
          this.#rotateLeft(parent);
          parent = node;
        }

        this.#rotateRight(gp);
      } else {
        if (node === parent.left) {
          this.#rotateRight(parent);
          parent = node;
        }

        this.#rotateLeft(gp);
      }
      parent.color = COLOR.BLACK;
      gp.color = COLOR.RED;
    }
  }

  /** Deletions */
  delete(key) {
    let node = this.root;

    while (node && node.key !== key)
      node = key < node.key ? node.left : node.right;

    if (!node) return;

    this.length -= 1;

    let flexNode = null;
    let deletedNodeColor = null;

    if (!(node.left && node.right)) {
      flexNode = this.#handleOneOrZeroChildrenNode(node);

      this.#replaceParentsChild(node.parent, node, flexNode);
      deletedNodeColor = node.color;
    } else {
      // two children
      let inorder = node.right;
      while (inorder.left) inorder = inorder.left;

      node.key = inorder.key;

      flexNode = this.#handleOneOrZeroChildrenNode(inorder);

      this.#replaceParentsChild(inorder.parent, inorder, flexNode);
      deletedNodeColor = inorder.color;
    }

    if (deletedNodeColor === COLOR.BLACK) {
      this.#fixDelete(flexNode);
      if (flexNode instanceof NilNode)
        this.#replaceParentsChild(flexNode.parent, flexNode, null);
    }
  }

  #fixDelete(node) {
    if (this.root === node) {
      node.color = COLOR.BLACK;
      return;
    }

    let sibling = this.#getSibling(node);

    if (sibling.color === COLOR.RED) {
      this.#handleRedSibling(node, sibling);
      sibling = this.#getSibling(node);
    }

    if (this.#isBlack(sibling.left) && this.#isBlack(sibling.right)) {
      sibling.color = COLOR.RED;

      if (node.parent.color === COLOR.RED) node.parent.coloe = COLOR.BLACK;
      else this.#fixDelete(node.parent);
    } else this.#fixDeleteSibWithRedChildren(node, sibling);
  }

  #fixDeleteSibWithRedChildren(node, sibling) {
    let isLeftChild = node === node.parent.left;
    if (isLeftChild && this.#isBlack(sibling.right)) {
      sibling.left.color = COLOR.BLACK;
      sibling.color = COLOR.RED;

      this.#rotateRight(sibling);
      sibling = node.parent.right;
    } else if (!isLeftChild && this.#isBlack(sibling.left)) {
      sibling.right.color = COLOR.BLACK;
      sibling.color = COLOR.RED;

      this.#rotateLeft(sibling);
      sibling = node.parent.left;
    }

    sibling.color = node.parent.color;
    node.parent.color = COLOR.BLACK;
    if (isLeftChild) {
      sibling.right.color = COLOR.BLACK;
      this.#rotateLeft(node.parent);
    } else {
      sibling.left.color = COLOR.BLACK;
      this.#rotateRight(node.parent);
    }
  }

  /** Utility */
  #replaceParentsChild(parent, old, n) {
    if (!parent) this.root = n;
    else if (parent.left === old) parent.left = n;
    else if (parent.right === old) parent.right = n;
    else
      throw new InvalidArgumentException('Node is not a child of its parent');

    if (n) n.parent = parent;
  }

  // Rotations
  #rotateRight(node) {
    let parent = node.parent;
    let left = node.left;

    node.left = left.right;
    if (left.right) left.right.parent = node;

    left.right = node;
    node.parent = left;

    this.#replaceParentsChild(parent, node, left);
  }

  #rotateLeft(node) {
    let parent = node.parent;
    let right = node.right;

    node.right = right.left;
    if (right.left) right.left.parent = node;

    right.left = node;
    node.parent = right;

    this.#replaceParentsChild(parent, node, right);
  }
  // End

  // Getters
  #getUncle(parent) {
    let gp = parent.parent;
    if (gp.left === parent) return gp.right;
    else if (gp.right === parent) return gp.left;
    else
      throw new InvalidArgumentException(
        'Parent is not a child of grandparent'
      );
  }

  #getSibling(node) {
    let parent = node.parent;
    if (node === parent.left) return parent.right;
    if (node === parent.right) return parent.left;

    throw new InvalidArgumentException(
      'Parent is not a child of its grandparent'
    );
  }

  #isBlack(node) {
    return node === null || node.color === COLOR.BLACK;
  }

  // Handlers
  #handleOneOrZeroChildrenNode(node) {
    let ret = null;
    if (!node.left && !node.right)
      ret = node.color === COLOR.BLACK ? new NilNode() : null;
    else ret = node.left ?? node.right;
    return ret;
  }

  #handleRedSibling(node, sibling) {
    sibling.color = COLOR.BLACK;
    node.parent.color = COLOR.RED;

    if (node === node.parent.left) this.#rotateLeft(node.parent);
    else this.#rotateRight(node.parent);
  }
  /**End Utility */

  /* Iterators */
  [Symbol.iterator]() {
    /** Returns inorder traversal of tree */
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
