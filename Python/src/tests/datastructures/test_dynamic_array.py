# pylint: skip-file

import pytest
from dss.collections.array_dynamic import DynamicArray


class TestDynamicArrayOnCreation:
  def test_should_not_be_none(self):
    arr = DynamicArray()
    assert(arr) is not None

  def test_should_have_capacity_10(self):
    arr = DynamicArray()
    assert(arr.get_capacity()) == 10

  def test_should_have_capacity_5(self):
    arr = DynamicArray(5)
    assert(arr.get_capacity()) == 5

  def test_should_raise_exception_for_invalid_initial_capacity(self):
    with pytest.raises(ValueError):
      arr = DynamicArray(0)


class TestDynamicArrayInserts:
  def test_get_invalid_index_greater_size(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(10)

  def test_get_invalid_index_less_than_zero(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(-1)


class TestDynamicArrayDeletes:
  def test_get_invalid_index_greater_size(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(10)

  def test_get_invalid_index_less_than_zero(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(-1)


class TestDynamicArrayIndexError:
  def test_get_invalid_index_greater_size(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(10)

  def test_get_invalid_index_less_than_zero(self):
    arr = DynamicArray()
    with pytest.raises(IndexError):
      arr.get(-1)
