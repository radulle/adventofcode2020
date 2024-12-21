const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  return grid;
}

function process(grid) {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let SR, SC, ER, EC;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (SR && ER) break;
      if (grid[i][j] === "S") (SR = i), (SC = j);
      if (grid[i][j] === "E") (ER = i), (EC = j);
    }
  }

  function flood(grid, sr, sc, er, ec) {
    let steps = 0;
    let score = Infinity;
    const map = new Map();
    map.set(`${sr},${sc}`, 0);
    const q = [[[sr, sc, null]]];
    let path = null;

    main: while (q.length) {
      const layer = q[steps];
      q[steps] = null;
      if (!layer?.length) break;
      if (score < steps) break;

      for (const prev of layer) {
        const [r, c] = prev;

        if (r === er && c === ec) {
          score = steps;
          path = prev;
          break main;
        }

        for (let i = 0; i < 4; i++) {
          const rr = r + dirs[i][0];
          const cc = c + dirs[i][1];
          const key = `${rr},${cc}`;
          const nSteps = steps + 1;
          if (map.has(key)) continue;
          if (grid[rr][cc] !== "#") {
            q[nSteps] = q[nSteps] || [];
            q[nSteps].push([rr, cc, prev]);
            map.set(`${rr},${cc}`, nSteps);
          }
        }
      }
      steps++;
    }

    const _path = [];
    while (true) {
      if (!path) break;
      _path.push(path);
      path = path[2];
    }

    return [score, _path];
  }

  const [dist, path] = flood(grid, SR, SC, ER, EC);

  let ans1 = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = path.length - 1; j >= 0; j--) {
      if (i + j + 2 > dist - 100) continue;
      const [r1, c1] = path[i];
      const [r2, c2] = path[path.length - 1 - j];
      if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 2) continue;
      ans1++
    }
  }

  let ans2 = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = path.length - 1; j >= 0; j--) {
      const [r1, c1] = path[i];
      const [r2, c2] = path[path.length - 1 - j];
      const m = Math.abs(r1 - r2) + Math.abs(c1 - c2);
      if (i + j + m > dist - 100) continue;
      if (m > 20 || m < 2) continue;
      ans2++
    }
  }

  return [ans1, ans2];
}
