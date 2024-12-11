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
  let sr, sc;
  search: for (let rr = 0; rr < grid.length; rr++) {
    for (let cc = 0; cc < grid[0].length; cc++) {
      if (grid[rr][cc] === "^") {
        (sr = rr), (sc = cc);
        break search;
      }
    }
  }

  let stuck = 0;

  // TODO: Try using Workers
  for (let RR = 0; RR < grid.length; RR++) {
    main: for (let CC = 0; CC < grid[0].length; CC++) {
      if (grid[RR][CC] !== "#" && grid[RR][CC] !== "^") {
        let r = sr;
        let c = sc;

        grid[RR][CC] = "O";

        let i = 0;
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

          if (
            !(rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length)
          ) {
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
    }
  }

  return stuck;
}
