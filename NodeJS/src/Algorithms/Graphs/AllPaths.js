import { EXAMPLE_GRAPH } from '#dss/collections/GraphAL';

/** Printing all paths in a graph can be done using a BFS or a DFS */

function BFSPaths(graph, src, dest) {
  let path = [src];
  const q = [[...path]];

  let all = [];

  while (q.length) {
    let curr_path = q.pop();
    let last_visited = curr_path[curr_path.length - 1];

    if (last_visited === dest) {
      all.push([...curr_path]);
    }

    for (let neighbor of Object.keys(graph.adjacencyList[last_visited].edges)) {
      if (!curr_path.includes(neighbor)) q.push([...curr_path, neighbor]);
    }
  }

  return all;
}

function DFSPath(graph, src, dest, seen, path, res) {
  seen.add(src);
  path.push(src);
  if (src === dest) {
    res.push([...path]);
  }

  for (let neighbor of Object.keys(graph.adjacencyList[src].edges)) {
    if (!seen.has(neighbor))
      DFSPath(graph, neighbor, dest, seen, [...path], res);
  }
  seen.delete(src);
  path.pop();
}

const seen = new Set();
function printAllPathsByBFS() {
  let res = BFSPaths(EXAMPLE_GRAPH, 'A', 'E');

  console.log(res);
}

function printAllPathsByDFS() {
  let res = [];
  DFSPath(EXAMPLE_GRAPH, 'A', 'E', seen, [], res);
  console.log(res);
}

printAllPathsByDFS();
