const { input, consoleTime, Graph } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input.split("\n").map((e) => e.split("-"));
}

function process(input) {
  const graph = {};
  for (let [source, target] of input) {
    if (!graph[source]) graph[source] = { key: source, adj: [], _adj: "" };
    if (!graph[target]) graph[target] = { key: target, adj: [], _adj: "" };
  }

  for (let [source, target] of input) {
    graph[source].adj.push(graph[target]);
    graph[target].adj.push(graph[source]);
    graph[source]._adj += `,${target}`;
    graph[target]._adj += `,${source}`;
  }

  const ans1 = new Set();
  for (let adj0 of Object.values(graph)) {
    for (let adj1 of adj0.adj) {
      if (adj1 === adj0) continue;
      for (let adj2 of adj1.adj) {
        if (adj2 === adj0 || adj2 === adj1) continue;
        for (let adj3 of adj2.adj) {
          if (adj3 !== adj0) continue;
          const combo = [adj0.key, adj1.key, adj2.key];
          combo.sort();
          ans1.add(combo.join(","));
        }
      }
    }
  }

  const ans2 = new Set();
  function explore(node, seen) {
    for (let adj of node.adj) {
      let nSeen = seen.split(",");
      if (nSeen.every((v) => adj._adj.includes(v))) {
        nSeen.push(adj.key);
        nSeen.sort();
        nSeen = nSeen.join(",");
        if (ans2.has(nSeen)) continue;
        ans2.add(nSeen);
        explore(adj, nSeen);
      }
    }
  }

  for (let node of Object.values(graph)) {
    explore(node, node.key);
  }

  return [
    [...ans1].filter((e) => e.split(",").some((e1) => e1.startsWith("t")))
      .length,
    [...ans2].reduce((acc, cur) => (cur.length > acc.length ? cur : acc), ""),
  ];
}
