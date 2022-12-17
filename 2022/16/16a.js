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

  const ids = {};
  const dists = {};
  const flows = {};

  {
    const graph = new Graph();

    for (const { from, to, flow } of data) {
      if (!graph.hasNode(from)) graph.addNode(from);
      for (const t of to) {
        if (!graph.hasNode(t)) graph.addNode(t);
      }
      flows[from] = flow;
    }

    for (const { from, to, flow } of data) {
      for (const t of to) {
        graph.addEdge(from, t, flow);
      }
    }

    for (const key in flows) {
      if (flows[key] === 0 && key !== "AA") {
        delete flows[key];
        continue;
      }
      dists[key] = graph.bfs(key);
    }

    let i = 0;
    for (const key in dists) {
      ids[key] = 2 ** i;
      i++;
      for (const [k, d] of dists[key].entries()) {
        if (k in dists && d !== 0) continue;
        dists[key].delete(k);
      }
    }
  }

  const MINUTES = 30;
  let maxFlow = -Infinity;

  function explore(to, visited, minute, released) {
    if (minute > MINUTES) return;

    minute++;
    released += flows[to] * (MINUTES - minute);
    if (maxFlow < released) maxFlow = released;

    for (const [key, dist] of dists[to].entries()) {
      if (ids[key] & visited) continue;
      explore(key, visited + ids[key], minute + dist, released);
    }
  }

  explore("AA", 0, -1, 0);

  console.info(maxFlow);
}
