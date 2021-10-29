# pylint: skip-file

import pytest
from dss.collections.linkedlist_single import SinglyLinkedList


class TestOnCreation:
  def test_should_not_be_none(self):
    arr = SinglyLinkedList()
    assert(arr) is not None
