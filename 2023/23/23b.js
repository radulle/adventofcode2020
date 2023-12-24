// run with --stack-size=4200
const { input, consoleTime, StackQue } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return calc(parse(input));
}

function parse(input) {
  return input.split("\n").map((l) => l.split(""));
}

function calc(data) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const neighbors = dr.length;

  data[0][1] = "s";
  data[data.length - 1][data[0].length - 1 - 1] = "e";
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
      if (data[r][c] !== ".") continue;
      let count = 0;
      for (let i = 0; i < neighbors; i++) {
        const rr = r + dr[i];
        const cc = c + dc[i];
        if (rr < 0 || cc < 0 || rr >= data.length || cc >= data[0].length)
          continue;
        if (data[rr][cc] !== "#") count++;
      }
      if (count > 2) data[r][c] = "o";
    }
  }

  console.info(data.map((l) => l.join("")).join("\n"));

  const start = { type: "s", edges: {} };
  const end = { type: "e", edges: {} };
  const grid = {
    [hash(0, 1)]: start,
    [hash(data.length - 1, data[0].length - 1 - 1)]: end,
  };

  const visited = new Array(data.length)
    .fill(0)
    .map(() => new Array(data[0].length).fill(0));
  visited[0][1] = 1;

  function traverse(r, c, d, k) {
    for (let i = 0; i < neighbors; i++) {
      const rr = r + dr[i];
      const cc = c + dc[i];
      if (rr < 0 || cc < 0 || rr >= data.length || cc >= data[0].length)
        continue;
      const kk = hash(rr, cc);
      const vv = data[rr][cc];
      const dd = d + 1;
      const distinct = isDistinct(vv);
      if (visited[rr][cc]) {
        if (distinct && k !== kk) {
          grid[k].edges[kk] = dd;
          grid[kk].edges[k] = dd;
        }
        continue;
      }
      visited[rr][cc] = 1;
      if (vv === "#") continue;
      if (!distinct) {
        traverse(rr, cc, dd, k);
        continue;
      }
      grid[k].edges[kk] = dd;
      if (!grid[kk]) grid[kk] = { k: kk, v: vv, edges: {} };
      grid[kk].edges[k] = dd;
      traverse(rr, cc, 0, kk);
    }
  }

  traverse(0, 1, 0, hash(0, 1));

  const results = [];
  function explore(node, dist = 0, seen = new Set()) {
    if (node === end) return results.push([dist, seen]);
    for (let [k, d] of Object.entries(node.edges)) {
      if (seen.includes(k)) continue;
      const n = grid[k];
      explore(n, dist + d, seen + k);
    }
  }

  explore(start, 0, hash(0, 1));

  return results.sort((a, b) => b[0] - a[0])[0];
}

function hash(r, c) {
  return `#${r},${c};`;
}

function isDistinct(v) {
  return v === "o" || v === "s" || v === "e";
}
