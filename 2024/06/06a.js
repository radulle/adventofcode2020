const { input, consoleTime } = require("lib");

consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split(""));
  return grid;
}

function process(grid) {
  let r, c;
  search: for (let rr = 0; rr < grid.length; rr++) {
    for (let cc = 0; cc < grid[0].length; cc++) {
      if (grid[rr][cc] === "^") {
        (r = rr), (c = cc);
        break search;
      }
    }
  }

  const visited = new Set();
  visited.add(`${r},${c}`);

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  let i = 0;

  while (true) {
    const rr = r + dr[i];
    const cc = c + dc[i];

    if (!(rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length)) break;

    const vv = grid[rr][cc];

    if (vv === "#") {
      if (i < 3) i++;
      else i = 0;
      continue;
    }

    visited.add(`${rr},${cc}`);
    r = rr;
    c = cc;
  }

  return visited.size;
}
