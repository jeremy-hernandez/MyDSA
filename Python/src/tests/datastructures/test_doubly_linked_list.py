# pylint: skip-file

import pytest
from dss.collections.linkedlist_double import DoublyLinkedList


class TestOnCreation:
  def test_should_not_be_none(self):
    arr = DoublyLinkedList()
    assert(arr) is not None
