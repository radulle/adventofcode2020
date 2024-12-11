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
  let { visited: _visited, sr, sc } = require("./06a")(grid);

  let stuck = 0;

  main: for (const el of _visited) {
    const [RR, CC] = el.split(",").map(Number);

    let r = sr;
    let c = sc;
    let i = 0;

    grid[RR][CC] = "O";

    const visited = new Set();
    visited.add(`${r},${c},${i}`);

    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    while (true) {
      const rr = r + dr[i];
      const cc = c + dc[i];

      if (visited.has(`${rr},${cc},${i}`)) {
        stuck++;
        grid[RR][CC] = ".";
        continue main;
      }

      if (!(rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length)) {
        grid[RR][CC] = ".";
        continue main;
      }

      const vv = grid[rr][cc];

      if (vv === "#" || vv === "O") {
        if (i < 3) {
          i++;
        } else {
          i = 0;
        }
        continue;
      }

      visited.add(`${rr},${cc},${i}`);
      r = rr;
      c = cc;
    }
  }

  return stuck;
}
