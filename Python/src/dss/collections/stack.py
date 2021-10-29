
class Stack:
  def __init__(self) -> None:
    self.__stack = []

  def __len__(self):
    return len(self.__stack)

  def peek(self):
    return self.__stack[len(self.__stack) - 1]

  def pop(self):
    return self.__stack.pop()  # this is cheating

  def push(self, value):
    self.__stack.append(value)  # also cheating
