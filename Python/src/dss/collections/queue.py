class Queue:
  def __init__(self) -> None:
    self.__queue = []

  def __len__(self):
    return len(self.__queue)

  def enqueue(self, value):
    self.__queue.append(value)
    return True

  def dequeue(self):
    return self.__queue.pop(0)
