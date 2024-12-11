const { input, consoleTime } = require("lib");

if (require.main === module) consoleTime(() => solve(input()));

function solve(input) {
  return process(parse(input));
}

function parse(input) {
  const grid = input.split("\n").map((r) => r.split(""));
  return grid;
}

function process(grid) {
  let r, c, sr, sc;
  search: for (let rr = 0; rr < grid.length; rr++) {
    for (let cc = 0; cc < grid[0].length; cc++) {
      if (grid[rr][cc] === "^") {
        (sr = rr), (sc = cc);
        break search;
      }
    }
  }

  r = sr, c = sc;
  let i = 0;

  const visited = new Set();
  let pos = `${r},${c}`;
  visited.add(pos);

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

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

    pos = `${rr},${cc}`;
    visited.add(pos);
    r = rr;
    c = cc;
  }

  if (require.main !== module) { return { visited, sr, sc } }

  return visited.size;
}

module.exports = process;