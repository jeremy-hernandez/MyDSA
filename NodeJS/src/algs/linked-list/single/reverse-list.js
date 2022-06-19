import { SinglyLinkedList } from 'DataStructures/Classes/2_SinglyLinkedList/SinglyLinkedList';

export { reverse, reverseInPlace, reverseInPlaceRecursive };
// returns new list
function reverse(ll) {
  //O(n)
  try {
    let newLL = new SinglyLinkedList();
    let curr = ll.head;
    while (curr !== null) {
      newLL.unshift(curr.val);
      curr = curr.next;
    }
    return newLL;
  } catch (err) {}
}

//returns list using same nodes
function reverseInPlace(ll) {
  //O(n)
  try {
    let pre = null;
    let curr = ll.head;

    // update tail as it should be flipped
    ll.tail = curr;

    while (curr !== null) {
      let temp = curr.next;
      curr.next = pre;
      pre = curr;
      curr = temp;
    }

    // update head as it should be flipped
    ll.head = pre;
  } catch (err) {}
}

//returns list using same nodes using recursion
function reverseInPlaceRecursive(ll) {
  //O(n)
  try {
    function reverse(node, prev) {
      let temp = node.next;
      node.next = prev;

      if (temp === null) return node;
      return reverse(temp, node);
    }
    ll.tail = ll.head;

    ll.head = reverse(ll.head, null);
    return ll.head; // if you want to return the head of the list
  } catch (err) {}
}
