package dss;

public class ArrayDynamic<T> {
  private Integer Capacity;
  private Object[] Arr;

  public Integer size;

  public ArrayDynamic() {
    Capacity = 10;
    size = 0;

    Arr = new Object[Capacity];
  }

  public ArrayDynamic(Integer _capacity) {
    if (_capacity <= 0)
      throw new IllegalArgumentException("_capacity must be greater than 0");

    Capacity = _capacity;
    size = 0;

    Arr = new Integer[Capacity];
  }

  /** Access */
  public Object get(int index) {
    if (index < 0)
      throw new IllegalArgumentException("index must be non-negative");

    return Arr[index];
  }

  /** Insertions */
  public void append(T value) {
    if (size + 1 == Capacity)
      resize();

    Arr[size] = value;

    size += 1;
  }

  /** Deletions */
  public Object pop() {
    if (size == 0)
      return null;

    Object item = Arr[size];
    size -= 1;
    return item;
  }

  /** Utility */
  public Integer getCapacity() {
    return Capacity;
  }

  private void resize() {
    Object[] newArr = new Object[Capacity * 2];
    for (int i = 0; i < Capacity; ++i) {
      newArr[i] = Arr[i];
    }
    Capacity *= 2;
    Arr = newArr;
  }
}
