const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const grid = input.split("\n").map((row) => row.split(""));
  return grid;
}

function process(grid) {
  let sr, sc, er, ec;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (sr && er) break;
      if (grid[i][j] === "S") (sr = i), (sc = j);
      if (grid[i][j] === "E") (er = i), (ec = j);
    }
  }

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const seen = new Set();
  const q = [[[sr, sc, 0, null]]];
  let steps = 0;
  let score = Infinity;
  const prevs = [];

  main: while (q.length) {
    const layer = q[steps];
    if (layer?.length) {
      for (const prev of layer) {
        const [r, c, d] = prev;
        seen.add(`${r},${c},${d}`);

        if (r === er && c === ec) {
          score = steps;
          prevs.push(prev);
        }

        if (steps > score) break main;

        let rr, cc, key;

        for (let i = 0; i < 4; i++) {
          if (i === (d + 2) % 4) continue;
          rr = r + dirs[i][0];
          cc = c + dirs[i][1];
          key = `${rr},${cc},${i}`;
          const nSteps = steps + 1 + (i !== d ? 1000 : 0);
          if (grid[rr][cc] !== "#" && !seen.has(key)) {
            q[nSteps] = q[nSteps] || [];
            q[nSteps].push([rr, cc, i, prev]);
          }
        }
      }
    }
    steps++;
  }

  const all = new Set();
  prevs.forEach(function getPrev(p) {
    if (!p) return;
    all.add(`${p[0]},${p[1]}`);
    return getPrev(p[3]);
  });

  return [score, all.size];
}
