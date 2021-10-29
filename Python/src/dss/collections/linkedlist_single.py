
import colorama


class SllNode:
  def __init__(self, _val=0, _next=None) -> None:
    self.value = _val
    self.next = _next


class SinglyLinkedList:
  def __init__(self):
    self.head = None
    self.tail = None
    self.__size = 0

  def __len__(self):
    return self.__size

  def __str__(self):
    curr = self.head
    node_values = []
    while curr:
      node_values.append(colorama.Fore.GREEN + str(curr.value))
      node_values.append(colorama.Style.RESET_ALL + "->")
      curr = curr.next
    return "".join(node_values[:len(node_values)-1])

  ### Access ###
  def get(self, index):
    if index < 0 or index >= self.__size:
      raise IndexError("Index out of range")

    curr = self.head
    while index > 0:
      curr = curr.next
    return curr

  ### Insertions ###
  def append(self, value):
    node = SllNode(value)
    if not self.head:
      # no elements in list
      self.tail = node
      self.head = self.tail
    else:
      self.tail.next = node
      self.tail = self.tail.next

    self.__size += 1
    return True

  def append_front(self, value):
    node = SllNode(value)
    if not self.head:
      # no elements in list
      self.head = node
      self.tail = self.head
    else:
      node.next = self.head
      self.head = node

    self.__size += 1
    return True

  def insert(self, index, value):
    if index == self.__size:
      self.append(value)
    elif index == 0:
      self.append_front(value)
    else:
      prev = self.get(index - 1)
      node = SllNode(value, prev.next)

      prev.next = node

      self.__size += 1
    return True

    ### Deletions ###

  ### Deletions ###
  def pop(self):
    if not self.head:
      return None

    node = self.tail
    if self.__size == 1:
      self.head = self.tail = None
    else:
      self.tail = self.get(self.__size - 2)
      self.tail.next = None

    self.__size -= 1
    return node

  def pop_front(self):
    if not self.head:
      return None

    node = self.head
    if self.__size == 1:
      self.head = self.tail = None
    else:
      self.head = self.head.next

    self.__size -= 1

    return node

  def remove(self, index):
    if index == self.__size:
      return self.pop()
    if index == 0:
      return self.pop_front()

    prev = self.get(index - 1)

    node = prev.next
    prev.next = prev.next.next

    self.__size -= 1
    return node

  ### Utils ###

  ### Private Functions ###
