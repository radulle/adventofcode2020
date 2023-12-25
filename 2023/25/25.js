const exec = require("util").promisify(require("child_process").exec);
const { input, consoleTime } = require("lib");
const { writeFile } = require("fs").promises;

consoleTime(() => solve(input()));

function solve(input) {
  return calc(parse(input));
}

function parse(input) {
  return input
    .split("\n")
    .map((l) => l.split(": ").map((m) => m.split(" ").filter(Boolean)));
}

function calc(data) {
  const graphViz = true; // Set to true to generate a GraphViz file
  if (graphViz) {
    let dot = "digraph G {\n";
    for (const [[from], to] of data) {
      dot += `  ${from}`;
      if (to.length) dot += ` -> ${to.join(",")}`;
      dot += "\n";
    }
    dot += "}";
    writeFile("data.dot", dot).then(async () => {
      await exec("cluster -C2 data.dot > split.dot");
      const A = await exec(`grep -c "cluster=1" split.dot`);
      const B = await exec(`grep -c "cluster=2" split.dot`);
      console.info(A.stdout * B.stdout);
      await exec("dot -Tsvg -Ksfdp split.dot -o split.svg");
    });
  }

  const graph = {};
  let total = 0;
  for (const [[from], to] of data) {
    if (!graph[from]) (graph[from] = []), total++;
    for (const t of to) {
      if (!graph[t]) (graph[t] = []), total++;
      // Remove three edges from the graph visually
      // vqj -> szh jbx -> sml zhb -> vxr
      if (from === "vqj" && t === "szh") continue;
      if (from === "jbx" && t === "sml") continue;
      if (from === "zhb" && t === "vxr") continue;
      graph[from].push(t);
      graph[t].push(from);
    }
  }

  let count = 0;
  function explore(node, visited = new Set()) {
    if (visited.has(node)) return;
    visited.add(node), count++;
    for (const key of node) explore(graph[key], visited);
  }
  explore(Object.values(graph)[0]);

  return count * (total - count);
}
