
### TREE UTILS ###
def inorder_successor(node):
  while node.left:
    node = node.left
  return node


def inorder_predecessor(node):
  while node.right:
    node = node.right
  return node


def tree_height(root):
  if not root:
    return 0

  return 1 + max(tree_height(root.left), tree_height(root.right))
