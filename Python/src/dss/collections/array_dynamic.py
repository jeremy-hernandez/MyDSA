import copy


class DynamicArray:
  '''
  We COULD use the built in array to accomplish all our tasks, 
  but this is assuming all we have access to is creating an 
  array with a specified size

  FYI: This is a simple implementation, Not too many checks
  '''

  def __init__(self, capacity=10):
    if capacity < 1:
      raise ValueError("Capacity parameter must be greater than 0")
    self.__capacity = capacity
    self.__list = [0] * self.__capacity
    self.__size = 0

  def __len__(self):
    return self.__size

  def __str__(self):
    return str(self.__list[:self.__size])

  ### Access ###
  def get(self, index):
    if index > self.__size or index < 0:
      raise IndexError("Index out of range")
    return self.__list[index]

  def get_capacity(self):
    return self.__capacity

  ### Insertions ###
  def append(self, value):
    if self.__size >= self.__capacity:
      self.__expand___list()

    self.__list[self.__size] = value
    self.__size += 1

  def append_front(self, value):
    if self.__size >= self.__capacity:
      self.__expand___list()

    self.__size += 1
    self.__shift_right(0)
    self.__list[0] = value

  def insert(self, value, index):
    if index > self.__size or index < 0:
      raise IndexError("Index out of range")
    if self.__size >= self.__capacity:
      self.__expand___list()

    self.__size += 1
    self.__shift_right(0)
    self.__list[index] = value
    return True

  ### Deletions ###
  def pop(self):
    if self.__size > 0:
      res = self.__list[self.__size - 1]
      self.__size -= 1
      return res
    return None

  def pop_front(self):
    if self.__size > 0:
      res = self.__list[0]
      self.__size -= 1
      self.__shift_left(0)
      return res
    return None

  def remove(self, index):
    if index > self.__size or index < 0:
      raise IndexError("Index out of range")
    res = copy.deepcopy(self.__list[index])
    self.__size -= 1
    self.__shift_left(index)
    return res

  # Private methods

  def __expand___list(self):
    self.__list += [0] * self.__capacity
    self.__capacity *= 2

  def __shift_right(self, start):
    for index in range(self.__size, start, -1):
      self.__list[index] = self.__list[index - 1]

  def __shift_left(self, start):
    for index in range(start, self.__size):
      self.__list[index] = self.__list[index + 1]
