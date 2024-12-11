const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return [process(...parse(input), 0), process(...parse(input), 1)];
}

function parse(input) {
  input = input.split("\n").map((line) => line.split(""));
  rmax = input.length;
  cmax = input[0].length;
  const map = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") continue;
      if (input[i][j] === "#") continue;
      const v = input[i][j];
      if (!map[v]) map[v] = [];
      map[v].push([i, j]);
    }
  }

  return [map, rmax, cmax];
}

function process(map, rmax, cmax, part) {
  const grid = new Array(rmax).fill(null).map(() => new Array(cmax).fill(0));
  for (const ant in map) {
    for (let i = 0; i < map[ant].length; i++) {
      for (let j = 0; j < map[ant].length; j++) {
        if (i === j) continue;
        const [r1, c1] = map[ant][i];
        const [r2, c2] = map[ant][j];
        if (part) grid[r1][c1] = 1;

        let d = 2;
        while (true) {
          const nr1 = d * r1 - (d - 1) * r2;
          const nc1 = d * c1 - (d - 1) * c2;
          if (nr1 < 0 || nr1 >= rmax || nc1 < 0 || nc1 >= cmax) break;
          grid[nr1][nc1] = 1;
          if (!part) break;
          d++;
        }

        d = 2;
        while (true) {
          const nr2 = d * r2 - (d - 1) * r1;
          const nc2 = d * c2 - (d - 1) * c1;
          if (nr2 < 0 || nr2 >= rmax || nc2 < 0 || nc2 >= cmax) break;
          grid[nr2][nc2] = 1;
          if (!part) break;
          d++;
        }
      }
    }
  }

  return grid.reduce(
    (acc, row) => acc + row.reduce((acc, cell) => acc + cell, 0),
    0
  );
}
