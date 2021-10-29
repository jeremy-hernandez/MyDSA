import dss.ArrayDynamic;

public class run {
  public static void main(String[] args) {
    ArrayDynamic coll = new ArrayDynamic();
    coll.append(1);
    coll.append(2);
    coll.append(3);

    for (int i = 0; i < coll.size; ++i) {
      System.out.println(coll.get(i));
    }
  }
}
