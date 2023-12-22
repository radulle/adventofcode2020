const { exec } = require("child_process");
const { input, consoleTime } = require("lib");
const { writeFile } = require("fs").promises;

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  return input
    .split("\n")
    .map((l) => l.split("~").map((m) => m.split(",").map((n) => +n)))
    .map(([a, b]) => {
      let diff = 0;
      let axis;
      for (let i = 0; i < 3; i++) {
        const d = b[i] - a[i];
        if (d > diff) (diff = d), (axis = i);
      }
      const res = [[a[2], a[0], a[1]]];
      for (let i = 1; i <= diff; i++)
        res.push([
          a[2] + i * (axis === 2 ? 1 : 0),
          a[0] + i * (axis === 0 ? 1 : 0),
          a[1] + i * (axis === 1 ? 1 : 0),
        ]);
      return res;
    });
}

function process(data) {
  let X, Y, Z;
  (X = 0), (Y = 0), (Z = 0);
  for (const brick of data) {
    for (const block of brick) {
      const [z, x, y] = block;
      Z = Math.max(Z, z);
      X = Math.max(X, x);
      Y = Math.max(Y, y);
    }
  }

  while (true) {
    const grid = nGrid();
    let settled = true;
    bricks: for (let i = 0; i < data.length; i++) {
      const brick = data[i];
      for (const block of brick) {
        const [z, x, y] = block;
        if (z === 1) continue bricks;
        if (grid[z - 1][x][y] !== 0 && i !== grid[z - 1][x][y] - 1)
          continue bricks;
      }
      settled = false;
      brick.forEach((_, i) => (brick[i][0] -= 1));
    }
    if (settled) break;
  }

  const grid = nGrid();
  const graph = {};
  {
    let i = 1;
    for (const brick of data) {
      if (!graph[i]) graph[i] = { id: i, children: {}, parents: {} };
      for (const block of brick) {
        const [z, x, y] = block;
        const top = grid[z + 1][x][y];
        if (top && top !== i) {
          if (!graph[top]) graph[top] = { id: top, children: {}, parents: {} };
          graph[i].children[top] = graph[top];
        }
        const bot = grid[z - 1][x][y];
        if (bot && bot !== i) {
          if (!graph[bot]) graph[bot] = { id: bot, children: {}, parents: {} };
          graph[i].parents[bot] = graph[bot];
        }
      }
      i++;
    }
  }

  const graphViz = false; // Set to true to generate a GraphViz file
  if (graphViz) {
    let dot = "digraph G {\n";
    for (const node of Object.values(graph)) {
      dot += `  ${node.id}`;
      const children = Object.keys(node.children);
      if (children.length) dot += ` -> ${children.join(",")}`;
      dot += "\n";
    }
    dot += "}";
    writeFile("data.dot", dot).then(() =>
      exec("dot -Tpng data.dot -o data.png")
    );
  }

  Object.values(graph).forEach((node) => {
    node.supports = [];
    const Q = [node];
    while (Q.length) {
      const n = Q.shift();
      for (const child of Object.values(n.children)) {
        if (node.supports.includes(child.id)) continue;
        if (
          !Object.values(child.parents).every(
            (e) => node.supports.includes(e.id) || node.id === e.id
          )
        )
          continue;
        node.supports.push(child.id);
        Q.push(child);
      }
    }
  });

  const nodes = Object.values(graph);
  return [
    nodes.filter((n) => !n.supports.length).length,
    nodes.reduce((a, c) => a + c.supports.length, 0),
  ];

  function nGrid() {
    const grid = Array(Z + 1)
      .fill()
      .map(() =>
        Array(X + 1)
          .fill()
          .map(() => Array(Y + 1).fill(0))
      );
    let i = 1;
    for (const brick of data) {
      for (const block of brick) {
        const [z, x, y] = block;
        grid[z][x][y] = i;
      }
      i++;
    }
    return grid;
  }
}
