import colorama


class AvlNode:
  def __init__(self, _key=0, _left=None, _right=None) -> None:
    self.key = _key
    self.left = _left
    self.right = _right
    self.height = 1

  def __str__(self) -> str:
    headers = ["left", "key", "right", "height"]
    left_key = self.left and self.left.key
    right_key = self.right and self.right.key

    def colorize(txt):
      txt = str(txt)
      return colorama.Fore.BLUE + f"{txt:^8}" + colorama.Style.RESET_ALL

    return f"|{headers[0]:_^8}|{headers[1]:_^8}|{headers[2]:_^8}|{headers[3]:_^8}|\n" + \
        f"|{colorize(left_key)}|{colorize(self.key)}|{colorize(right_key)}|{colorize(self.height)}|"


def avl_node_height(node):
  if not node:
    return 0
  return node.height


def avl_balance_factor(node):
  if not node:
    return 0

  return avl_node_height(node.left) - avl_node_height(node.right)


def avl_children_max_height(node):
  return max(avl_node_height(node.left), avl_node_height(node.right)) + 1


def avl_l_rotate(node):
  right_tree = node.right
  right_tree_left_node = right_tree.left

  right_tree.left = node
  node.right = right_tree_left_node

  node.height = avl_children_max_height(node)

  right_tree.height = avl_children_max_height(right_tree)

  return right_tree


def avl_r_rotate(node):
  left_tree = node.left
  left_tree_right_node = left_tree.right

  left_tree.right = node
  node.left = left_tree_right_node

  node.height = avl_children_max_height(node)

  left_tree.height = avl_children_max_height(left_tree)

  return left_tree


def avl_insert_rebalance(root, key):
  # adjust height
  root.height = avl_children_max_height(root)

  # balance factor check
  balance = avl_balance_factor(root)

  ret = root
  if balance > 1:
    # left heavy
    if key < root.left.key:
      ret = avl_r_rotate(root)
    else:
      root.left = avl_l_rotate(root.left)
      ret = avl_r_rotate(root)
  elif balance < -1:
    # right heavy
    if key > root.right.key:
      ret = avl_l_rotate(root)
    else:
      root.right = avl_r_rotate(root.right)
      ret = avl_l_rotate(root)

  return ret


def avl_remove_rebalance(root):
  root.height = avl_children_max_height(root)

  # balance factor
  balance = avl_balance_factor(root)

  ret = root
  if balance > 1:
    if avl_balance_factor(root.left) >= 0:
      ret = avl_r_rotate(root)
    else:
      root.left = avl_l_rotate(root.left)
      ret = avl_r_rotate(root)
  elif balance < -1:
    if avl_balance_factor(root.right) <= 0:
      ret = avl_l_rotate(root)
    else:
      root.right = avl_r_rotate(root.right)
      ret = avl_l_rotate(root)

  return ret


class AvlBinarySearchTree:
  '''Implementing AVL Binary Search Tree
      -- using recursion
  '''

  def __init__(self) -> None:
    self.root = None
    self.__size = 0

  def __str__(self) -> str:
    res = []

    def inorder(root):
      if not root:
        return
      inorder(root.left)
      res.append(colorama.Fore.GREEN + f"{root.key}")
      res.append(colorama.Style.RESET_ALL + ", ")
      inorder(root.right)

    inorder(self.root)
    res = res[:len(res)-1]
    res.append(colorama.Style.RESET_ALL)
    return "".join(res)

  def __len__(self):
    return self.__size

  ### Access ###
  def find(self, key):
    def search(root):
      if not root:
        return None
      if key == root.key:
        return root
      return search(root.left) if key < root.key else search(root.right)

    return search(self.root)

  ### Insertions ###
  def insert(self, key):
    self.root = self.__insert_recursive(self.root, key)
    self.__size += 1

  def __insert_recursive(self, root, key):
    if not root:
      return AvlNode(key)

    if key < root.key:
      root.left = self.__insert_recursive(root.left, key)
    elif key > root.key:
      root.right = self.__insert_recursive(root.right, key)
    else:
      # duplicate
      raise ValueError(f"key {{{key}}} already in tree")

    return avl_insert_rebalance(root, key)

  ### Deletions ###
  def remove(self, key):
    self.root = self.__remove_recursive(self.root, key)

  def __remove_recursive(self, root, key):
    if not root:
      return root

    if key < root.key:
      root.left = self.__remove_recursive(root.left, key)
    elif key > root.key:
      root.right = self.__remove_recursive(root.right, key)
    else:
      # this means we found the node to delete
      self.__size -= 1
      if not (root.left and root.right):
        temp = root.left if root.left else root.right
        root = temp if temp else None
      else:
        # inorder successor
        temp = root.right
        parent = root
        while temp.left:
          parent = temp
          temp = temp.left

        root.key = temp.key
        if temp == root.right:
          root.right = temp.right
        else:
          parent.left = None

    if not root:
      return root

    return avl_remove_rebalance(root)
