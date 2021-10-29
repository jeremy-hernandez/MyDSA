import chalk from 'chalk';

import { DynamicArray } from '#dss/collections/ArrayDynamic';
import { SinglyLinkedList } from '#dss/collections/LinkedListSingle';
import { DoublyLinkedList } from '#dss/collections/LinkedListDouble';
import { Stack } from '#dss/collections/Stack';
import { Queue } from '#dss/collections/Queue';
import { BinarySearchTree } from '#dss/collections/Bst';
import { AvlBST } from '#dss/collections/BstAvl';
import { RedBlackBST } from '#dss/collections/BstRedBlack';
import { MaxBinaryHeap } from '#dss/collections/HeapBinary';
import { GraphAL } from '#dss/collections/GraphAL';

export {
  MyDynamicArray as DynamicArray,
  MySLL as SinglyLinkedList,
  MyDLL as DoublyLinkedList,
  MyStack as Stack,
  MyQueue as Queue,
  MyBinarySearchTree as BinarySearchTree,
  MyAvlBST as AvlBST,
  MyRedBlackBST as RedBlackBST,
  MyMaxBinaryHeap as MaxBinaryHeap,
  MyGraphAL as GraphAL,
};

class MyDynamicArray extends DynamicArray {
  toString() {
    let out = '';

    for (let i of this) {
      if (out) out += ',';
      out += chalk.greenBright(i);
    }

    return (out = `[${out}]`);
  }
}

class MySLL extends SinglyLinkedList {
  toString() {
    let out = '';
    for (let node of this) {
      if (out) out += '->';
      out += chalk.greenBright(node);
    }
    return out;
  }
}

class MyDLL extends DoublyLinkedList {
  toString() {
    let out = '';
    for (let node of this) {
      if (out) out += '<->';
      out += chalk.greenBright(node);
    }
    return out;
  }
}

class MyStack extends Stack {}
class MyQueue extends Queue {}

class MyBinarySearchTree extends BinarySearchTree {
  toString() {
    let out = '';

    for (let i of this) {
      if (out) out += ',';
      out += chalk.greenBright(i);
    }

    return (out = `${out}`);
  }
}
class MyAvlBST extends AvlBST {
  toString() {
    let out = '';

    for (let i of this) {
      if (out) out += ',';
      out += chalk.greenBright(i);
    }

    return (out = `${out}`);
  }
}
class MyRedBlackBST extends RedBlackBST {
  toString() {}
}
class MyMaxBinaryHeap extends MaxBinaryHeap {}

class MyGraphAL extends GraphAL {}
