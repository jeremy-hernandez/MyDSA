import { EXAMPLE_GRAPH } from '#dss/collections/GraphAL';

function BFSIterative(graph, source, seen) {
  let queue = [source];
  seen.add(source);
  while (queue.length > 0) {
    let v = queue.shift();
    //processing
    console.log(`Found ${v}: ${Object.keys(graph.adjacencyList[v].edges)}`);
    //end
    for (let neighbor of Object.keys(graph.adjacencyList[v].edges)) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

function BFSRecursive(graph, queue, seen) {
  if (queue.length === 0) return;

  let v = queue.shift();
  //processing
  console.log(`Found ${v}: ${Object.keys(graph.adjacencyList[v].edges)}`);
  //end
  for (let neighbor of Object.keys(graph.adjacencyList[v].edges)) {
    if (seen.has(neighbor)) continue;

    seen.add(neighbor);
    queue.push(neighbor);
  }
  BFSRecursive(graph, queue, seen);
}

let seen = new Set();

function testIterative() {
  for (let k of Object.keys(EXAMPLE_GRAPH.adjacencyList)) {
    if (!seen.has(k)) {
      BFSIterative(EXAMPLE_GRAPH, k, seen);
    }
  }
}

function testRecursive() {
  let queue = [];
  for (let k of Object.keys(EXAMPLE_GRAPH)) {
    k = Number(k);
    if (seen.has(k)) continue;

    seen.add(k);
    queue.push(k);
    BFSRecursive(EXAMPLE_GRAPH, queue, seen);
  }
}

testIterative();
// testRecursive();
