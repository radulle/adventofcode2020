const { input, consoleTime, Graph } = require("lib");

class CaveGraph extends Graph {
  /** Cave specific DFS */
  dfs(start, finish) {
    let count = 0;
    const paths = [];

    function append(path, key) {
      return path + "," + key;
    }

    const dfs = (sourceKey, visited = "", step = 0) => {
      for (const { key } of this.getAdjecent(sourceKey)) {
        if (key === "end") {
          count++;
          paths.push(append(visited, key));
          continue;
        }
        if (key === "start") continue;
        if (/^[a-z]*$/.test(key) && visited.includes(key)) continue;
        dfs(key, append(visited, key), step + 1);
      }
    };

    dfs(start, "start");
    return count;
  }
}

const graph = new CaveGraph();

input()
  .split("\n")
  .forEach((row) => {
    const edge = row.split("-");
    edge.forEach((node) => {
      if (!graph.hasNode(node)) graph.addNode(node);
    });
    graph.addEdge(...edge);
    graph.addEdge(...edge.reverse());
  });

consoleTime(() => solve(graph));

function solve(graph) {
  return graph.dfs("start");
}
