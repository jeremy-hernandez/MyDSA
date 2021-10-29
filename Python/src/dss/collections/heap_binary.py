import colorama
# will implement later
# class HeapNode:
#   def __init__(self, _key=0) -> None:
#     self.key = _key


class BinaryHeap:
  '''
  By Default is implemented as a min heap
  '''

  def __init__(self, _variant="min") -> None:
    """Constructor

    Parameters:
    - _variant = "min" | "max"
    """
    self.__heap = []
    self.is_max = _variant == "max"

  def __str__(self) -> str:
    out = ["["]
    for v in self.__heap:
      out.append(colorama.Fore.GREEN + str(v))
      out.append(colorama.Style.RESET_ALL + ", ")
    out.pop()
    out.append(colorama.Style.RESET_ALL)
    out.append("]")
    return "".join(out)

  def __len__(self):
    return len(self.__heap)

  ### Access ###
  def top(self):
    if len(self.__heap) == 0:
      return None
    return self.__heap[0]

  ### Insertions ###
  def insert(self, value):
    self.__heap.append(value)
    self.__bubble_up()

    return True

  ### Deletions ###
  def extract(self):
    length = len(self.__heap)
    if length == 0:
      return None

    item = self.__heap[0]
    popped = self.__heap.pop()

    if length > 1:
      self.__heap[0] = popped
      self.__bubble_down()

    return item

  ### Private Methods ###
  def __swap(self, idx1, idx2):
    self.__heap[idx1], self.__heap[idx2] = self.__heap[idx2], self.__heap[idx1]

  def __bubble_up(self):
    idx = len(self.__heap) - 1
    curr = self.__heap[idx]

    while idx > 0:
      # in a binary heap, parent of a node is idx - 1 divided by 2. Take floor
      parent_idx = (idx - 1) // 2
      parent = self.__heap[parent_idx]
      if (self.is_max and curr > parent) or (not self.is_max and curr < parent):
        self.__swap(idx, parent_idx)
        idx = parent_idx
      else:
        break

  def __bubble_down(self):
    idx = 0
    curr = self.__heap[idx]

    while idx < len(self.__heap):
      # in a binary heap. the left child is the current index * 2 + 1, right is + 2
      lchild = idx * 2 + 1
      rchild = idx * 2 + 2

      choice = lchild if self.__heap[lchild] > self.__heap[rchild] else rchild

      if (self.is_max and curr < choice) or (not self.is_max and curr > choice):
        self.__swap(idx, choice)
        curr = choice
      else:
        break
