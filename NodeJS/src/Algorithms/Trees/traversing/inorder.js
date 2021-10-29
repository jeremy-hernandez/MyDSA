export { inorder };

function inorder(root, recursive = false) {
  let func = recursive ? inorderR : inorderI;
  func(root);
}

function inorderR(root) {
  inorderR(root.left);
  console.log(root.key);
  inorderR(root.right);
}

function inorderI(root) {
  let stack = [];
  let curr = root;
  while (stack.length || curr) {
    if (curr) {
      stack.push(curr);
      curr = curr.left;
    } else {
      curr = stack.pop();

      console.log(curr.key);

      curr = curr.right;
    }
  }
}
