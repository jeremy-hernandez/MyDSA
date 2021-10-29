import { EXAMPLE_GRAPH } from '#dss/collections/GraphAL';

function DFSIterative(graph, vertex, seen) {
  let stack = [vertex];

  while (stack.length) {
    let v = stack.pop();

    if (seen.has(v)) continue;
    seen.add(v);

    //processing
    console.log(`Found ${v}: ${Object.keys(graph.adjacencyList[v].edges)}`);
    //end
    for (let neighbor of Object.keys(graph.adjacencyList[v].edges)) {
      if (!seen.has(neighbor)) stack.push(neighbor);
    }
  }
}

function DFSRecursive(graph, vertex, seen) {
  seen.add(vertex);
  //processing
  console.log(`Found ${v}: ${Object.keys(graph.adjacencyList[v].edges)}`);
  //end
  for (let neighbor of Object.keys(graph.adjacencyList[v].edges)) {
    if (!seen.has(neighbor)) DFSRecursive(graph, neighbor, seen);
  }
}

const seen = new Set();

function testIterative() {
  for (let v of Object.keys(EXAMPLE_GRAPH.adjacencyList)) {
    if (seen.has(v)) continue;
    DFSIterative(EXAMPLE_GRAPH, v, seen);
  }
}

function testRecursive() {
  for (let v of Object.keys(EXAMPLE_GRAPH.adjacencyList)) {
    if (seen.has(v)) continue;
    DFSRecursive(EXAMPLE_GRAPH, v, seen);
  }
}

testIterative();
