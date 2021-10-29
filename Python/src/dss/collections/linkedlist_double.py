
import colorama


class DllNode:
  def __init__(self, _val=0, _next=None, _prev=None):
    self.value = _val
    self.next = _next
    self.prev = _prev

  def __str__(self) -> str:
    return f"Value: {self.value} | Prev == None: {self.prev == None} | Next === None: {self.next == None}"


class DoublyLinkedList:
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
      node_values.append(colorama.Style.RESET_ALL + "<->")
      curr = curr.next
    return "".join(node_values[:len(node_values)-1])

  ### Access ###
  def get(self, index):
    if index < 0 or index >= self.__size:
      raise IndexError("Index out of range")

    curr = self.head
    while index > 0:
      curr = curr.next
      index -= 1

    return curr

  ### Insertions ###
  def append(self, value):
    node = DllNode(value, None, self.tail)
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
    node = DllNode(value, self.head)
    if not self.head:
      # no elements in list
      self.head = node
      self.tail = self.head
    else:
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
      node = DllNode(value, prev.next, prev)

      prev.next.prev = node
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
      self.tail = self.tail.prev
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
      self.head = node.next
      self.head.prev = None

    self.__size -= 1

    return node

  def remove(self, index):
    if index == self.__size:
      return self.pop()
    if index == 0:
      return self.pop_front()

    node = self.get(index)

    node.prev.next = node.next
    node.next.prev = node.prev

    self.__size -= 1

    return node

  ### Utils ###

  ### Private Functions ###
