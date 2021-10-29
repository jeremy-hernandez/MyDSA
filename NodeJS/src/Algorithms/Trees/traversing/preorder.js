export { preorder };

function preorder(root, recursive = false) {
  let func = recursive ? preorderR : preorderI;
  func(root);
}

function preorderR(root) {
  console.log(root.key);
  preorderR(root.left);
  preorderR(root.right);
}

function preorderI(root) {
  let stack = [root];
  while (stack.length) {
    let e = stack.pop();

    console.log(e.key);

    if (e.right) stack.push(e.right);
    if (e.left) stack.push(e.left);
  }
}
