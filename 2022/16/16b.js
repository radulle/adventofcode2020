const { input, consoleTime, Graph } = require("lib");

consoleTime(() => solve());

function solve() {
  const data = input()
    .split("\n")
    .map((line) =>
      /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/.exec(
        line
      )
    )
    .map((l) => ({ from: l[1], flow: +l[2], to: l[3].split(", ") }));

  const dists = {};
  const flows = {};
  const graph = new Graph();
  const MINUTES = 26;

  for (const { from, to, flow } of data) {
    if (!graph.hasNode(from)) graph.addNode(from);
    for (const t of to) {
      if (!graph.hasNode(t)) graph.addNode(t);
    }
    flows[from] = flow;
  }

  for (const { from, to, flow } of data) {
    for (const t of to) {
      try {
        graph.addEdge(from, t, flow);
      } catch (e) {
        debugger;
      }
    }
  }

  for (const key in flows) {
    if (flows[key] === 0 && key !== "AA") {
      delete flows[key];
      continue;
    }
    dists[key] = graph.bfs(key);
  }

  for (const key in dists) {
    for (const [k, d] of dists[key].entries()) {
      if (k in dists && d !== 0) continue;
      dists[key].delete(k);
    }
  }

  const ids = [...Object.keys(dists)].reduce((a, c, i) => {
    a[c] = i;
    return a;
  }, {});
  const totals = new Map();

  function explore(to, visited, minute, released) {
    if (minute > MINUTES) return;

    minute++;
    released += flows[to] * (MINUTES - minute);
    if ((totals.get(visited) || 0) < released) totals.set(visited, released);

    for (const [key, dist] of dists[to].entries()) {
      if ((2 ** ids[key]) & visited) continue;
      explore(key, visited + 2 ** ids[key], minute + dist, released);
    }
  }

  explore("AA", 0, -1, 0);

  const combinations = [...totals.entries()];

  let maxFlow = 0;

  for (let i = 0; i < combinations.length; i++) {
    for (let j = 0; j < combinations.length; j++) {
      if (i === j) continue;
      const a = combinations[i];
      const b = combinations[j];
      if (!(a[0] & b[0]) && a[1] + b[1] > maxFlow) maxFlow = a[1] + b[1];
    }
  }
  console.info(maxFlow);
}
