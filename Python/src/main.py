# import traceback
import colorama

import dss.data_structures as dss

try:
  coll = dss.RedBlackBinarySearchTree()
  # coll.insert(20)
  # coll.insert(10)
  # coll.insert(30)

  # print(coll.root)
except ValueError as e:
  print(colorama.Style.BRIGHT + colorama.Fore.RED +
        str(e) + colorama.Style.RESET_ALL)
  # traceback.format_exc() + colorama.Style.RESET_ALL)
