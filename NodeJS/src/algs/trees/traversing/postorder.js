export { postorder };

function postorder(root, recursive = false) {
  let func = recursive ? postorderR : postorderI;
  func(root);
}

function postorderR(root) {
  postorderR(root.left);
  postorderR(root.right);
  console.log(root.key);
}

function postorderI(root) {
  let s1 = [root],
    s2 = [];

  while (s1.length) {
    let e = s1.pop();
    s2.push(e);

    if (e.left) s1.push(e.left);
    if (e.right) s1.push(e.right);
  }

  while (s2.length) console.log(s2.pop());
}

// optimized one stack approach
function postorderI2(root) {
  let stack = [];

  while (true) {
    while (root) {
      if (root.right) {
        stack.push(root.right);
      }
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    if (root.right && stack.at(-1) == root.right) {
      stack.pop();
      stack.push(root);
      root = root.right;
    } else {
      console.log(root.key);
      root = null;
    }

    if (stack.length <= 0) break;
  }
}
