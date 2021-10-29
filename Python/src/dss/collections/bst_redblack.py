from dss.utils.utils import inorder_successor

# THIS IS INCOMPLETE


class RedBlackNode:
  def __init__(self, _key=0, _parent=None, _left=None, _right=None) -> None:
    self.key = _key
    self.left = _left
    self.right = _right
    self.is_red = True
    self.parent = _parent


class RedBlackBinarySearchTree:
  '''Red Black Tree Implemention
      Using following defitions
      1. Every node is either red or black
      2. Every leaf is None or black
      3. If a node is red, then both its children are black
      4. Path from a node to descendant leaf contains the same number of black nodes
  '''

  def __init__(self) -> None:
    self.root = None
    # self.__size = 0

  ### Access ###
  def find(self, key):
    return self.__find(self.root, key)

  def __find(self, root, key):
    if not root or root.key == key:
      return root
    if key < root.key:
      return self.__find(root.left, key)

    return self.__find(root.right, key)

  ### Insertions ###

  def insert(self, key):
    node = RedBlackNode(key)
    self.root = self.__insert(self.root, node)
    self.__insert_fix(node)

  def __insert(self, root, node):
    node.parent = root
    if not root:
      return node

    if node.key < root.key:
      root.left = self.__insert(root.left, node)
    elif node.key > root.key:
      root.right = self.__insert(root.right, node)
    else:
      raise ValueError("Duplicate key")

    return root

  def __insert_fix(self, node):
    while node.parent and node.parent.is_red:
      if node.parent == node.parent.parent.right:  # right tree of grandparent
        uncle = node.parent.parent.left
        if uncle.is_red:
          uncle.is_red = False
          node.parent.is_red = False
          node.parent.parent.is_red = True
          node = node.parent.parent
        else:
          if node == node.parent.left:
            self.rotate_right(node.parent)
            node = node.parent
          node.parent.is_red = False
          node.parent.parent.is_red = True
          self.rotate_left(node.parent.parent)
      else:  # left tree of grandparent
        uncle = node.parent.parent.right
        if uncle.is_red:
          uncle.is_red = False
          node.parent.is_red = False
          node.parent.parent.is_red = True
          node = node.parent.parent
        else:
          if node == node.parent.right:
            self.rotate_left(node.parent)
            node = node.parent
          node.parent.is_red = False
          node.parent.parent.is_red = True
          self.rotate_right(node.parent.parent)
      if node == self.root:
        break

    self.root.is_red = False

  ### Deletions ###
  def remove(self, key):
    node = self.root
    while node:
      if node.key == key:
        deleting = node

      if key < node.key:
        node = node.left
      else:
        node = node.right

    # key is not in tree
    if not deleting:
      return False

    deleting_was_red = deleting.is_red
    ref = deleting

    if not (deleting.left and deleting.right):
      target = deleting.right if deleting.right else deleting.left
      subject = target
      self.__switch_nodes(deleting, target)
    else:
      ref = inorder_successor(deleting.right)
      deleting_was_red = ref.is_red
      subject = ref.right

      if ref.parent == deleting:
        subject.parent = ref
      else:
        self.__switch_nodes(ref, ref.right)
        ref.right = deleting.right
        ref.right.parent = ref

    if not deleting_was_red:
      self.__remove_fix(deleting)

  def __switch_nodes(self, node1, node2):
    if not node1.parent:
      self.root = node2
    elif node1 == node1.parent.left:
      node1.parent.left = node2
    else:
      node1.parent.right = node2

    node2.parent = node1.parent

  def __remove_fix(self, node):
    while node != self.root and not node.is_red:
      if node == node.parent.left:
        sib = node.parent.right
        if sib.is_red:
          sib.is_red = False
          node.parent.is_red = True
          self.rotate_left(node.parent)
          sib = node.parent.right

        if not sib.left.is_red and not sib.right.is_red:
          sib.is_red = True
          node = node.parent
        else:
          if not sib.right.is_red:
            sib.left.is_red = False
            sib.is_red = True
            self.rotate_right(sib)
            sib = node.parent.right

          sib.is_red = node.parent.is_red
          node.parent.is_red = False
          sib.irght.s_red = False
          self.rotate_left(node.parent)
          node = self.root
      else:
        sib = node.parent.left
        if sib.is_red:
          sib.is_red = False
          node.parent.is_red = True
          self.rotate_right(node.parent)
          sib = node.parent.left

        if not sib.right.is_red and not sib.left.is_red:
          sib.is_red = True
          node = node.parent
        else:
          if not sib.left.is_red:
            sib.left.is_red = False
            sib.is_red = True
            self.rotate_left(sib)
            sib = node.parent.right

          sib.is_red = node.parent.is_red
          node.parent.is_red = False
          sib.irght.s_red = False
          self.rotate_right(node.parent)
          node = self.root
    node.is_red = False

  ### Rotations ###

  def rotate_left(self, node):
    r_tree = node.right
    node.right = r_tree.left

    if r_tree.left:
      r_tree.left.parent = node

    r_tree.parent = node.parent

    if not node.parent:
      self.root = r_tree
    elif node == node.parent.left:
      node.parent.left = r_tree
    else:
      node.parent.right = r_tree

    r_tree.left = node
    node.parent = r_tree

  def rotate_right(self, node):
    l_tree = node.left
    node.left = l_tree.right

    if l_tree.right:
      l_tree.left.parent = node

    l_tree.parent = node.parent

    if not node.parent:
      self.root = l_tree
    elif node == node.parent.left:
      node.parent.left = l_tree
    else:
      node.parent.right = l_tree

    l_tree.right = node
    node.parent = l_tree
