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
  let count = 0;
  const dr = [-1, 0, 1, 0, 1, 1, -1, -1];
  const dc = [0, 1, 0, -1, 1, -1, 1, -1];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "X") {
        for (let i = 0; i < 8; i++) {
          if (
            grid[r + dr[i]]?.[c + dc[i]] === "M" &&
            grid[r + 2 * dr[i]]?.[c + 2 * dc[i]] === "A" &&
            grid[r + 3 * dr[i]]?.[c + 3 * dc[i]] === "S"
          ) {
            count++;
          }
        }
      }
    }
  }

  return count;
}
