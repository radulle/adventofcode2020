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
    [-1, 0],
    [0, -1],
  ];
  const seen = new Set();
  const q = [[[sr, sc, 0, `${sr},${sc}`]]];
  let steps = 0;
  let score = Infinity;
  const paths = [];

  main: while (q.length) {
    const layer = q[steps];
    if (layer?.length) {
      for (const [r, c, d, path] of layer) {
        seen.add(`${r},${c},${d}`);

        if (r === er && c === ec) {
          score = steps;
          paths.push(path);
        }

        if (steps > score) break main;

        let rr, cc, key;

        for (let i = 0; i < 4; i++) {
          rr = r + dirs[i][0];
          cc = c + dirs[i][1];
          key = `${rr},${cc},${i}`;
          const nSteps = steps + 1 + (i !== d ? 1000 : 0);
          if (grid[rr][cc] !== "#" && !seen.has(key)) {
            q[nSteps] = q[nSteps] || [];
            q[nSteps].push([rr, cc, i, `${path};${rr},${cc}`]);
          }
        }
      }
    }
    steps++;
  }

  return [score, new Set(paths.join(";").split(";")).size];
}
