import colorama


class BstNode:
  def __init__(self, _key=0, _left=None, _right=None) -> None:
    self.key = _key
    self.left = _left
    self.right = _right
    self.counter = 1

  def __str__(self):
    out = f"key={self.key}, left={self.left is None}, " \
        f"right={self.right is None}, Count={self.counter}"
    return out


class BinarySearchTree:
  '''Binary Search Tree
     Implemented with duplicates allowed by a counter
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
      res.append(colorama.Fore.GREEN + f"{root.key}-{root.counter}")
      res.append(colorama.Style.RESET_ALL + ", ")
      inorder(root.right)

    inorder(self.root)
    return "".join(res[:len(res)-1])

  def __len__(self):
    return self.__size

  ### Access ###
  def find(self, key):
    curr = self.root
    while curr:
      if curr.key == key:
        return curr
      if key < curr.key:
        curr = curr.left
      else:
        curr = curr.right
    return None

  ### Insertions ###
  def insert(self, key, mode="r"):
    if mode == "r":
      self.root = self.__insert_recrusive(self.root, key)
    else:
      self.__insert_iterative(key)

    self.__size += 1

  def __insert_recrusive(self, root, key):
    if not root:
      return BstNode(key)

    if key == root.key:
      root.counter += 1
    elif key < root.key:
      root.left = self.__insert_recrusive(root.left, key)
    else:
      root.right = self.__insert_recrusive(root.right, key)

    return root

  def __insert_iterative(self, key):
    if not self.root:
      self.root = BstNode(key)
      return

    curr = self.root

    while curr:
      if curr.key == key:
        curr.counter += 1
        return

      if key < curr.key:
        if not curr.left:
          curr.left = BstNode(key)
          return
        curr = curr.left
      else:
        if not curr.right:
          curr.right = BstNode(key)
          return
        curr = curr.right

  ### Deletions ###
  def remove(self, key, mode="r"):
    if mode == "r":
      self.__remove_recursive(self.root, key)
    else:
      self.__remove_iterative(self.root, key)

  def __remove_recursive(self, root, key):
    if not root:
      return None

    if key < root.key:
      root.left = self.__remove_recursive(root.left, key)
    elif key > root.key:
      root.right = self.__remove_recursive(root.right, key)
    else:
      # only remove if all copies are gone
      root.counter -= 1
      if root.counter > 0:
        return root

      # If the node is with only one child or no child
      if not (root.left and root.right):
        replace_by = root.left if root.left else root.right
        root = None
        return replace_by

      # inorder succesor of current node
      curr = root.right
      while curr.left:
        curr = curr.left
      root.key = curr.key

      # we need to reset counter for this node here
      root.counter += 1

      self.__remove_recursive(root.right, curr.key)
    return root

  def __remove_iterative(self, root, key):
    curr = root
    parent = None
    is_left = True

    while curr:
      if key == curr.key:
        curr.counter -= 1
        # handling duplicates. decrement until 0
        if curr.counter > 0:
          return

        # Here we handle the cases the key node has 1 or zero children
        if not (curr.left and curr.right):
          replace_by = curr.left if curr.left else curr.right

          if not parent:
            self.root = replace_by
          else:
            if is_left:
              parent.left = replace_by
            else:
              parent.right = replace_by
          return

        # inorder successor

        successor = curr.right
        successor_parent = curr

        while successor.left:
          successor_parent = successor
          successor = successor.left

        curr.key = successor.key
        if successor_parent != curr:
          successor_parent.left = None
        else:
          curr.right = None

        # we need to reset counter for this node here
        curr.counter += 1

        return

      parent = curr
      if key < curr.key:
        is_left = True
        curr = curr.left
      elif key > curr.key:
        is_left = False
        curr = curr.right
