export { GraphAL, EXAMPLE_GRAPH };

class Edge {
  constructor(_src, _dest, _weight) {
    this.src = _src;
    this.dest = _dest;
    this.weight = _weight;
  }
}

class Vertex {
  constructor(_key, _edges = {}, _payload = null) {
    this.key = _key;
    this.edges = _edges;
    this.payload = _payload;
  }

  addEdge(edge) {
    if (this.edges[edge.dest]) return;
    this.edges[edge.dest] = edge;
  }

  removeEdge(dest) {
    if (this.edges[dest]) delete this.edges[dest];
  }
}

// Naive Implementation
class GraphAL {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(key) {
    if (this.adjacencyList[key]) return;
    this.adjacencyList[key] = new Vertex(key);
  }

  addEdge(src, dest) {
    this.adjacencyList[src].addEdge(new Edge(src, dest, 0));
  }

  removeEdge(src, dest) {
    this.adjacencyList[src].removeEdge(dest);
  }

  removeVertex(key) {
    if (this.adjacencyList[key]) delete this.adjacencyList[key];
  }

  static print(graph) {
    let vertices = Object.keys(graph.adjacencyList);
    for (let v of vertices) {
      let vertex = graph.adjacencyList[v];
      let edgeKeys = Object.keys(vertex.edges);
      let out = `Vertex ${vertex.key}\n`;
      for (let ek of edgeKeys) {
        let edge = vertex.edges[ek];
        out += `  -> ${edge.dest}\n`;
      }
      console.log(out);
    }
  }
}

const EXAMPLE_GRAPH = new GraphAL();
EXAMPLE_GRAPH.addVertex('A');
EXAMPLE_GRAPH.addVertex('B');
EXAMPLE_GRAPH.addVertex('C');
EXAMPLE_GRAPH.addVertex('D');
EXAMPLE_GRAPH.addVertex('E');
EXAMPLE_GRAPH.addVertex('F');
EXAMPLE_GRAPH.addVertex('G');
EXAMPLE_GRAPH.addVertex('H');
EXAMPLE_GRAPH.addVertex('I');

EXAMPLE_GRAPH.addEdge('A', 'B');
EXAMPLE_GRAPH.addEdge('A', 'E');

EXAMPLE_GRAPH.addEdge('B', 'C');
EXAMPLE_GRAPH.addEdge('B', 'F');
EXAMPLE_GRAPH.addEdge('B', 'G');

EXAMPLE_GRAPH.addEdge('C', 'D');
EXAMPLE_GRAPH.addEdge('C', 'E');

EXAMPLE_GRAPH.addEdge('F', 'A');
EXAMPLE_GRAPH.addEdge('F', 'I');

EXAMPLE_GRAPH.addEdge('G', 'H');

EXAMPLE_GRAPH.addEdge('I', 'C');
EXAMPLE_GRAPH.addEdge('I', 'E');
